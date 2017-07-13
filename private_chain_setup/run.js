console.log("Load script to mine only when there is some pending transactions");


var mining_threads = 1

function checkWork() {
    if (eth.getBlock("pending").transactions.length > 0) {
        if (eth.mining) return;
        console.log("== Pending transactions! Mining...");
        miner.start(mining_threads);
    } else {
        miner.stop();
        console.log("== No transactions! Mining stopped.");
    }
}

eth.filter("latest", function(err, block) { checkWork(); });
eth.filter("pending", function(err, block) { checkWork(); });

checkWork();

console.log("Unlock all accounts");
var unlocked = personal.unlockAccount(eth.accounts[0], "sunilprakash");
for (var i = 1; i < eth.accounts.length; i++) {
	console.log("Unlocking account"+i+": " + eth.accounts[i]);
	personal.unlockAccount(eth.accounts[i], "sunilprakash",86400);
};

console.log("mine once all pending transactions");
eth.pendingTransactions;

miner.start(4);admin.sleepBlocks(1);miner.stop();

