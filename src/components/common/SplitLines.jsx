/**
 * Renders authored lines inside overflow masks so they can be revealed one
 * by one (`.line-mask > .line-inner`). Lines are authored, not measured, so
 * the typographic rag is always intentional.
 */
export default function SplitLines({ lines, as: Tag = 'span', className = '', lineClassName = '', ...rest }) {
  return (
    <Tag className={className} {...rest}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span className={`line-inner ${lineClassName}`}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
