export class OrderService {
  async submitOrder(post_id: string) {
    // check for credentials = Auth guard will check the token.
    // request payment = bootpay will do.
    // save the order log = DB.
    return 'hello world';
  }
}
