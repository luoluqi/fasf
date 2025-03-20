const BaseService = require('./baseService')

class PayService extends BaseService {
    constructor() {
        super()
        this.mchId = '1707647128'
        this.appid = 'wx2f6b18d9f078f6ce'
        this.envId = 'prod-6gautg8r786b7e93'
        this.functionName = 'payCallback'
        this.refundName = 'refundCallback'
    }
    async unifiedOrder({outTradeNo, body, totalFee}){
      const res = await this.cloud.cloudPay.unifiedOrder({
        "body" : body, // 商品描述
        "outTradeNo" : outTradeNo, // 商户订单号
        "spbillCreateIp" : "123.12.12.123", // 终端 IP
        "subMchId" : this.mchId, // 商户号
        "totalFee" : totalFee, // 总金额
        "envId": this.envId, // 云函数环境名称
        "functionName": this.functionName, // 支付结果通知回调云函数名
        nonceStr: Math.random() + ''
      })
      return res
    }

    async refund({outTradeNo, totalFee, refundFee}){
      const res = await this.cloud.cloudPay.refund({
        "out_trade_no" : outTradeNo, // 商户订单号
        "out_refund_no": outTradeNo,
        "sub_mch_id" : this.mchId, // 商户号
        "total_fee" : totalFee, // 总金额
        "refund_fee" : refundFee,
        "envId": this.envId, // 云函数环境名称
        "functionName": this.refundName, // 支付结果通知回调云函数名
        nonce_str: Math.random() + ''
      })
      return res
    }

    async profitSharing({transactionId, outTradeNo, receivers}){
      const res = await this.cloud.cloudPay.profitSharing({
        sub_mch_id: this.mchId,
        // sub_appid: this.appid,
        transaction_id: transactionId,
        out_order_no: outTradeNo,
        receivers: receivers,
        nonce_str: Math.random() + ''
      })
      return res
    }
    
}

module.exports = PayService