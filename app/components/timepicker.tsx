interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TimePicker({ value, onChange }: TimePickerProps) {
  const [hour, minute] = value ? value.split(":") : ["00", "00"];

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(`${e.target.value}:${minute}`);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(`${hour}:${e.target.value}`);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i).map((i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) => i).map((i) =>
    i.toString().padStart(2, "0")
  );

  return (
    <div className="container mx-auto my-2 p-2 border border-gray-400 rounded-md">
      <div className="w-full border-solid border-1 border-black bg-red">
        <select
          value={hour}
          onChange={handleHourChange}
          name=""
          id=""
          className="px-2 outline-none bg-transparent"
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <span className="px-2">:</span>
        <select
          value={minute}
          onChange={handleMinuteChange}
          name=""
          id=""
          className="px-2 outline-none bg-transparent"
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
