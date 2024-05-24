// webhookController.js
import { Cart, User, Order } from '../models'; // Importa tus modelos de MongoDB
import { stripe } from '../services'; // Importa tu cliente de Stripe
import dotenv from 'dotenv';

dotenv.config();

const stripeWebhookHandler = async (req, res, next) => {
  // Obtener el evento de Stripe de la solicitud
  const event = req.stripeEvent;

  // Manejar el tipo de evento
  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object;

    try {
      // Obtener detalles del cliente y suscripción
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
      const customer = await stripe.customers.retrieve(subscription.customer);

      switch(event.type) {
        case 'invoice.payment_suceeded':
            // Crear una nueva orden en la base de datos
            const order = new Order({
                userId: customer.metadata.userId,
                products: subscription.items.data,
                total: invoice.total,
                status: 'paid'
            });
    
            // Guardar la orden en la base de datos
            await order.save();
    
            // Vaciar el carrito del usuario
            await Cart.findOneAndUpdate(
                { userId: customer.metadata.userId },
                { products: [] }
            );
    
            break;
        case 'customer.subscription.updated':
            // Actualizar la suscripción del cliente en la base de datos
            await User.findOneAndUpdate(
                { _id: customer.metadata.userId },
                { isSubscribed: subscription.status === 'active' }
            );
    
            break;
        case 'invoice.payment_failed':
            // Acciones a realizar cuando el pago de una factura falla
            // Por ejemplo, notificar al cliente sobre el problema de pago, actualizar el estado de la factura, etc.
            break;
        case 'customer.subscription.deleted':
            // Acciones a realizar cuando se cancela una suscripción
            // Por ejemplo, actualizar el estado de la suscripción del cliente en la base de datos, enviar notificaciones, etc.
            break;
        case 'customer.subscription.trial_will_end':
            // Acciones a realizar cuando el período de prueba de una suscripción está a punto de terminar
            // Por ejemplo, enviar un recordatorio al cliente sobre el fin del período de prueba, ofrecer descuentos o promociones, etc.
            break;       
      }
      res.status(200).end();
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  } else {
    // Manejar otros tipos de eventos de Stripe si es necesario
    res.status(200).end();
  }
};

export default { stripeWebhookHandler };
