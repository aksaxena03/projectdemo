
interface prp {
  label: string;
  placeholders: string;
}

function Data({ label, placeholders }: prp) {
  return (
    <div className="flex flex-col">
      <label htmlFor="">{label}</label>
      <input type="text" name="" id="" placeholder={placeholders} />
    </div>
  );
}

export default function Home() {


  return (
      <main className="flex h-screen">
      <div className="m-auto border-2 border-white rounded-xl flex flex-col p-12">
        <Data label="Username" placeholders="Username" />
        <Data label="Password" placeholders="Password" />
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Submit
        </button>
      </div>
    </main>);
}
