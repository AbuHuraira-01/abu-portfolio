export default function SectionHead({ page, title, lead }) {
  return (
    <div className="shead" data-layer={`Heading / ${page}`}>
      <p className="shead__path">
        <span className="shead__file">portfolio.fig</span>
        <span aria-hidden="true">/</span>
        <span>{page}</span>
      </p>
      <h2>{title}</h2>
      {lead && <p className="shead__lead">{lead}</p>}
    </div>
  );
}
