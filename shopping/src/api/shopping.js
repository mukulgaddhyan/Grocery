const ShoppingService = require("../services/shopping-service");
// const { PublishCustomerEvents } = require("../utils");
const UserAuth = require('./middlewares/auth');
const { SubscribeMessage, PublishMessage } = require('../utils');
const {CUSTOMER_BINDING_KEY} = require('../config')

module.exports = (app, channel) => {
    
    const service = new ShoppingService();

    SubscribeMessage(channel, service);

    app.post('/order',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const { txnNumber } = req.body;


        try {
            const { data } = await service.PlaceOrder({_id, txnNumber});

            const payload = await service.GetOrderPaylaod(_id, {data}, 'CREATE_ORDER');
            // PublishCustomerEvents(payload);
            console.log(JSON.stringify(payload.data));
            await PublishMessage(channel, CUSTOMER_BINDING_KEY, JSON.stringify(payload.data));

            return res.status(200).json(data);
            
        } catch (err) {
            next(err)
        }

    });

    app.get('/orders',UserAuth, async (req,res,next) => {

        const { _id } = req.user;

        try {
            const { data } = await service.GetOrders(_id);
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }

    });
       
    
    app.get('/cart', UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        try {
            const { data } = await service.GetCart(_id);
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    });
}