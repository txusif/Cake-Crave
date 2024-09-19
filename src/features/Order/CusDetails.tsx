export default function CusDetails({
  fullName,
  phoneNumber,
  address,
}: {
  fullName: string;
  phoneNumber: string;
  address: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h2 className="text-center text-xl font-bold uppercase text-Green">
        customer details
      </h2>
      <div className="flex flex-col gap-2 text-sm capitalize text-Grey">
        <p>
          Customer Name:
          <span className="ml-1 font-medium uppercase text-Black">
            {fullName}
          </span>
        </p>
        <p>
          Customer phone number:
          <span className="ml-1 font-medium uppercase text-Black">
            {phoneNumber}
          </span>
        </p>

        <p>
          Customer address:
          <span className="ml-1 font-medium uppercase text-Black">
            {address}
          </span>
        </p>
      </div>
    </div>
  );
}
