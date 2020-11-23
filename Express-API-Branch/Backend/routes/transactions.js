const express = require('express');
const router = express.Router();
const Transaction = require('../Models/Transaction');
const User = require('../Models/User')
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', (req,res) => {
    Transaction.find({}, function(err, results){
        res.render('userDashBoard', {mydata: results});
    });
});

router.use(express.urlencoded({
    extended: true
  }))

router.post('/newTransaction', (req, res) => {
    console.log(req.body);

    const transaction = new Transaction({
        processingDate: Date.now(),
        typeOfTransaction: req.body.typeOfTransaction,
        vendor: req.body.vendor,
        transactionAmount: req.body.transactionAmount,
        description: req.body.description,
        username: req.body.username,
        vendor: req.body.location,
        state: req.body.state,
        startingBalance: 0,
        endingBalance: 0

    });

    //SAVES TO DB

    transaction.save()
    .then(data => {
        updateBalance(transaction.username, transaction.transactionAmount, res, transaction.typeOfTransaction, transaction);
        checkRules(transaction.username, transaction.transactionAmount, res, transaction.location, transaction.id);
        console.log("Transaction saved: " + transaction._id);
    })
    .catch(err => {
        res.json({message: err})
    })

});

router.post('/newRule', (req, res) => {
    const tempName = "Jumbo12";
    const newRule = {"overUnderSame": req.body.Relation, "typeItem": req.body.typeItem, "transAmount":  req.body.Amount};
    User.findOneAndUpdate({username: tempName}, {"$push" : {"account.notificationRules" : newRule}, new: true})
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.post('/newRuleTime', (req, res) => {
    const newRule ={
        fromTime: req.body.fromTime,
        toTime: req.body.toTime,
    }
    const tempName = "Jumbo12"
    User.findOneAndUpdate({username: tempName}, {"$set" : {"account.betweenTimeRule" : newRule}, new: true})
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.post('/newRuleState', (req, res) => {
    const newRule = { withinStateRule: req.body.withinStateRule }
    const tempName="Jumbo12"
    console.log(newRule);
    User.findOneAndUpdate({username: tempName}, {"$set" : {"account.withinStateRule" : newRule.withinStateRule}, new: true})
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

function updateTransaction( res, transact)
{
    if (transact.typeOfTransaction === "cr")
    {
        User.findOne({username: transact.username})
        .then(User =>
        Transaction.findByIdAndUpdate({_id: transact._id}, {"$set" :{"endingBalance" : User.account.balance +transact.transactionAmount}, "startingBalance" : User.account.balance}, {new: true})
        .then(trans => console.log(trans))
        .catch(err => res.status(400).json('Error: ' + err))

    )
    .catch(err => console.log(err));
    }
    else if (transact.typeOfTransaction === "dr")
    {
        User.findOne({username: transact.username})
        .then(User =>
        Transaction.findByIdAndUpdate({_id: transact._id}, {"$set" :{"endingBalance" : User.account.balance - transact.transactionAmount}, "startingBalance" : User.account.balance}, {new: true})
        .then(trans => console.log(trans))
        .catch(err => res.status(400).json('Error: ' + err))

    )
    .catch(err => console.log(err));
    }
}

function updateRulesBroken(rules, id)
{
    Transaction.findByIdAndUpdate({_id: id}, {"$set" : {"transactionRulesBroken": rules}})
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function updateBalance(myusername, amount, res, typeTransaction,transact) {
    if (typeTransaction === "cr")
    {
        User.findOneAndUpdate({username: myusername}, {"$inc" :{"account.balance" : amount}}, {new: true})
        .then(updateTransaction(res, transact))
        .catch(err =>console.log('Error: ' + err));
    }
    else if (typeTransaction === "dr")
    {
        User.findOneAndUpdate({username: myusername}, {"$inc" :{"account.balance" : -amount}}, {new: true})
        .then(updateTransaction(res, transact))
        .catch(err =>console.log('Error: ' + err));
    }
}

function checkRules(myusername, amount, res, vendor, id){
    User.findOne({username: myusername})
    .then(User =>
        {
            var rulesBroken = "Transaction rules broken: ";
            const notBroken = rulesBroken;
            if (amount > User.account.transactionRules.overAmount)
            {
                rulesBroken = rulesBroken.concat("Over " + User.account.transactionRules.overAmount + ", ");
            }

            if (User.account.transactionRules.atVendor.includes(vendor))
            {
                rulesBroken = rulesBroken.concat("Vendor: " + vendor)
            }
            if (rulesBroken == notBroken)
            {
                res.json("No transaction rules broken");
            }
            else {
                updateRulesBroken(rulesBroken, id);
                res.json(rulesBroken);
            }

        })


    .catch(err =>console.log('Error: ' + err));
}

router.route('/getTransactions/:username').get((req, res) => {
    Transaction.find({username: req.params.username})
    .then(Transaction=> res.json(Transaction))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
