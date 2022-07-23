import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib();

const startingBalance = stdlib.parseCurrency(100)

const accAlice = await stdlib.newTestAccount(startingBalance);
console.log('Hello, Alice and Bobs!')

console.log('launching... Dapp');
const ctcAlice = accAlice.contract(backend);
console.log(`Alice deployed the contract ${accAlice}`)

console.log('Starting backend .....');

const users = [];
let done = false;
const startBobs = async () => {
    const newBob = async(who) => {
        const acc = await stdlib.newTestAccount(startingBalance);
        const ctc = acc.contract(backend, ctcAlice.getInfo());
        console.log(`${who} is joining the contract to be attached`)
        users.push(acc.getAddress());
    };
    
    await newBob('Bob1');
    await newBob('Bob2');
    await newBob('Bob3');
    while(!done){
        await stdlib.wait(1);

    }
    
    console.log(users)
}


await ctcAlice.p.Alice({
    ready: () => {
        console.log('Alice is ready');
        startBobs();
    },
});
/* await ctcAlice.Participant('Alice', { ready: () => {
    console.log('Alice is ready');
    startBobs();
    },
}) */

console.log('Goodbye, Alice and Bobs!');
done = true;