require('dotenv').config()
const EthereumTx = require('ethereumjs-tx')
const truffleContract = require('truffle-contract')
const debug = require('debug')('kubide:component:blockchain')
const fs = require('fs')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var HDWalletProvider = require("truffle-hdwallet-provider")
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider(process.env.ACCESS_POINT))
var private = process.env.PRIVATE_KEY
var private2 = process.env.PRIVATE_KEY_2
var HDWallet = new HDWalletProvider(private, process.env.ACCESS_POINT)
var address = HDWallet.addresses[0]
let abiDefinitionStr = process.env.ABI_DEFINITION
web3.eth.defaultAccount = address
let abiDefinition = JSON.parse(abiDefinitionStr)
let addr = process.env.CONTRACT_ADDR
var Contract = web3.eth.contract(abiDefinition)
let contract = Contract.at(addr)

let eventUser = contract.newLotteryEvent()

eventUser.watch(function(err,res){if(!err){console.log(res.args.msg + res.args.hist)}})

console.log (contract.owner())

var txRaw = {
nonce: web3.eth.getTransactionCount(address),
gasPrice: "0x174876e800",
gasLimit: 3000000,
from: address,
to: contract.address,
value: 0,
data: contract.newLottery.getData()
}

var tx = new EthereumTx(txRaw)
console.log (txRaw)
tx.sign(Buffer.from(private2, 'hex'))
var serializedTx = tx.serialize()

var signData = serializedTx.toString('hex')

web3.eth.sendRawTransaction('0x' +signData)
console.log ("SignData:"+signData)
