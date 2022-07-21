import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import {Extrinsic} from "../types";
import {Balance} from "@polkadot/types/interfaces";


export async function handleBlock(block: SubstrateBlock): Promise<void> {
    const blockHash = block.block.header.hash.toString();

    await Promise.all(block.block.extrinsics.map(async extrinsic => {

        if(extrinsic.isSigned){

            const origin = extrinsic.signer.toString();
            const entity = new Extrinsic(extrinsic.hash.toString());
            entity.blockHash = blockHash;
            entity.blockHeight = block.block.header.number.toBigInt();
            entity.origin = origin;

            await entity.save();
        }
    }))
}

// export async function handleEvent(event: SubstrateEvent): Promise<void> {
//     const {event: {data: [account, balance]}} = event;
//     //Retrieve the record by its ID
//     const record = await StarterEntity.get(event.block.block.header.hash.toString());
//     record.field2 = account.toString();
//     //Big integer type Balance of a transfer event
//     record.field3 = (balance as Balance).toBigInt();
//     await record.save();
// }

// export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
//     const record = await StarterEntity.get(extrinsic.block.block.header.hash.toString());
//     //Date type timestamp
//     record.field4 = extrinsic.block.timestamp;
//     //Boolean tyep
//     record.field5 = true;
//     await record.save();
// }


