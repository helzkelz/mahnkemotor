import React from 'react';
import { Content, Risk } from '../types';

interface ContentDisplayProps {
  content: Content;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-white border-b-2 border-green-900/50 pb-2 mb-4">{title}</h2>
    {children}
  </div>
);

const RiskMatrixTable: React.FC<{ risks: Risk[] }> = ({ risks }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b-2 border-green-700">
                    <th className="p-2 text-white">Threat</th>
                    <th className="p-2 text-white">Trigger</th>
                    <th className="p-2 text-white">Countermeasure</th>
                </tr>
            </thead>
            <tbody>
                {risks.map((risk, index) => (
                    <tr key={index} className="border-b border-green-900/50">
                        <td className="p-2 align-top font-semibold text-red-400">{risk.threat}</td>
                        <td className="p-2 align-top text-green-300/80">{risk.trigger}</td>
                        <td className="p-2 align-top text-green-300">{risk.countermeasure}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


export const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
  return (
    <div className="p-8 text-green-400 animate-fadeIn">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">{content.title}</h1>
        {content.codename && <p className="text-xl text-green-300">Codename: {content.codename}</p>}
        {content.class && <p className="text-lg text-green-500">Class: {content.class}</p>}
        {content.description && <p className="mt-4 text-green-300/90">{content.description}</p>}
      </header>

      {content.profile && (
        <Section title="🧪 Chemical Profile">
          <ul className="space-y-2 list-inside list-disc marker:text-green-600">
            {content.profile.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </Section>
      )}

      {content.riskMatrix && (
        <Section title="⚠️ Risk Matrix">
          <RiskMatrixTable risks={content.riskMatrix} />
        </Section>
      )}

      {content.fieldIdentification && (
          <Section title={`🔎 ${content.fieldIdentification.title}`}>
              <ul className="space-y-2 list-inside list-disc marker:text-green-600">
                  {content.fieldIdentification.points.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
          </Section>
      )}

      {content.enhancementVector && (
          <Section title={`⚡ ${content.enhancementVector.title}`}>
              <ul className="space-y-2 list-inside list-disc marker:text-green-600">
                  {content.enhancementVector.points.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
          </Section>
      )}
      
      {content.fieldStrategies && (
          <Section title={`🛡️ ${content.fieldStrategies.title}`}>
              <ul className="space-y-2 list-inside list-disc marker:text-green-600">
                  {content.fieldStrategies.points.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
          </Section>
      )}

      {content.reintegrationProtocol && (
          <Section title={`🔁 ${content.reintegrationProtocol.title}`}>
              <ul className="space-y-2 list-inside list-disc marker:text-green-600">
                  {content.reintegrationProtocol.points.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
          </Section>
      )}

      {content.contentBlocks && content.contentBlocks.map((block, index) => (
        <Section title={`// ${block.title}`} key={index}>
            <ul className="space-y-2 list-inside list-disc marker:text-green-600">
                {block.points.map((point, pIndex) => <li key={pIndex}>{point}</li>)}
            </ul>
        </Section>
      ))}

    </div>
  );
};