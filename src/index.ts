import Snowtransfer, {TOptions} from "./SnowTransfer";


function SnowTransfer(token: string, options: TOptions= {}) {
    return new Snowtransfer(token, options);
}

export default SnowTransfer;
export { SnowTransfer }