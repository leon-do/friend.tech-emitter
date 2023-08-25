export default function isNewFriend(args) {
  return (
    args.trader === args.subject &&
    args.isBuy === true &&
    args.shareAmount.toString() === "1" &&
    args.ethAmount.toString() === "0"
  );
}
