import React from 'react';

type TableTemplateProps = {
  templateHeading: string;
  templateHeaderData: Array<string>;
  children: JSX.Element | Array<JSX.Element>;
};

export const TemplateTable: React.FC<TableTemplateProps> = ({ templateHeading, templateHeaderData, children }) => {
  return (
    <div className="template-container">
      <h2 className="template-heading">{templateHeading}</h2>
      <div className="table">
        <div
          style={{ gridTemplateColumns: `repeat(${templateHeaderData.length}, 1fr)` }}
          className="table-row table-header"
        >
          {templateHeaderData.map((header, idx) => {
            return (
              <span key={idx} className="table-cell">
                {header}
              </span>
            );
          })}
        </div>
        <div className="table-body">{children}</div>
      </div>
    </div>
  );
};

type TemplateRowProps = {
  templateRowData: Array<string | JSX.Element>;
};

export const TemplateRow: React.FC<TemplateRowProps> = ({ templateRowData }): JSX.Element => {
  return (
    <div style={{ gridTemplateColumns: `repeat(${templateRowData.length}, 1fr)` }} className="table-row">
      {templateRowData.map((data, idx) => {
        return (
          <span key={idx} className="table-cell">
            {data}
          </span>
        );
      })}
    </div>
  );
};
