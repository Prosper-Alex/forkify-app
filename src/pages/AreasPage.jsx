import SectionHeader from "../components/layout/SectionHeader.jsx";
import ChipsRow from "../components/home/ChipsRow.jsx";

const areasSample = [
  "American",
  "British",
  "Canadian",
  "Chinese",
  "Croatian",
  "Dutch",
  "Egyptian",
  "French",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Jamaican",
  "Japanese",
  "Mexican",
  "Moroccan",
];

export default function AreasPage() {
  return (
    <section className="flex flex-col gap-6 pb-12">
      <SectionHeader
        title="Cuisines"
        subtitle="Explore by area"
        action={<button className="btn btn-sm btn-primary">Surprise me</button>}
      />
      <div className="rounded-2xl border border-base-200 bg-base-100 p-5">
        <ChipsRow items={areasSample} label="cuisines" />
      </div>
    </section>
  );
}
