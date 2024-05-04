const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require("../utils/app-errors");

// All Business logic will be here
class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async GetCart(_id){
    try{
      const cart = await this.repository.Cart(_id);
      return FormateData(cart);
    }catch{
        throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Cart')
    }
  }

  async PlaceOrder(userInput) {
    const { _id, txnNumber } = userInput;

    // Verify the txn number with payment logs

    try {
      const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
      return FormateData(orderResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId);
      return FormateData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async ManageCart(customerId, product, qty, isRemove){
    try {
        const cartResult = await this.repository.AddCartItem(customerId, product, qty, isRemove);        
        return FormateData(cartResult);
    } catch (err) {
        throw new APIError('Data Not found', err);
    }
  }

  async SubscribeEvents(payload){
    console.log("Something came for subscription in Shopping Service");

    const { event, data } =  payload;

    const { userId, product, qty } = data;

    switch(event){
        case 'ADD_TO_CART':
            this.ManageCart(userId,product, qty, false);
            break;
        case 'REMOVE_FROM_CART':
            this.ManageCart(userId,product,qty, true);
            break;
        default:
            break;
    }

  }

  async GetOrderPaylaod(userId, order, event){
    if(order){
        let payload={
            data : {userId, order},
            event : event
        }
        return FormateData(payload);
    }else{
        return FormateData({error: 'No Order Available'});
    }
  }

}


module.exports = ShoppingService;
