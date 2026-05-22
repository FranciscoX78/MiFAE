export default function JsonPreview({ jsonString }) {
  return (
    <div className="json-preview">
      <div className="json-preview-header">
        <p>JSON generado</p>
      </div>
      <pre>{jsonString}</pre>
    </div>
  );
}
