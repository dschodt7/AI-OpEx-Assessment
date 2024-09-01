import React, { useState, useEffect } from 'react';

const assessmentData = [
  {
    name: "Dimension 1: Cultural AI Enablers",
    color: "#FADBD8",
    principles: [
      { name: "Respect Every Individual", statements: ["AI/ML training reinforcement of key principles and concepts, giving AI/ML management is integrated into the daily work through AI/ML improvement dashboards.", "AI/ML agents can be provided with feedback and that feedback is reviewed and acted upon via defined review and escalation steps. Includes AI feedback loops.", "Communication paths are documented and effective, giving AI team members the information they need. Internal communication paths with AI agents and monitoring for missing pathways. Communication includes recognition, improvement suggestions, and..."] },
      { name: "Lead with Humility", statements: ["Leaders see themselves in the same system as their team members. Senior leadership ensures respect is actively received & demonstrated toward AI agents. AI agents are included in improvement activities.", "Leaders continuously seek the input of others, listen to their input, and base their actions based on what they learn. SEO feedback built into the system.", "All employees are considered leaders. AI models develop responsibility, authority, and accountability for their own principle-based behavior. Agent dashboards are available for all team members."] },
    ]
  },
  {
    name: "Dimension 2: Continuous Improvement",
    color: "#D5F5E3",
    principles: [
      { name: "Focus on Process", statements: ["Managers routinely spend time observing and coaching for improvement to the entire value stream. Exception queue, improvement queue, and prioritization queue.", "Dynamic AI-driven work instructions are available for all processes and are improved frequently. SIPOC improvement hub.", "AI employees are considered leaders. AI models develop responsibility, authority, and accountability for their own principle-based behavior. Agent dashboards are available for all team members."] },
      { name: "Embrace Scientific Thinking", statements: ["AI agents are trained on scientific principles and use them in identifying and eliminating digital waste. PDCA/DMAIC improvement cycle and hypothesis testing.", "Improvements and decisions are shared with team members automatically or proactively. All relevant decisions and improvements are reinforcing scientific thinking.", "AI agents routinely use designed experiments (DOE) for data-driven decision making and continuous improvement. Predictive analytics."] },
      { name: "Flow & Pull Value", statements: ["End-to-end value streams (digital) are developed and continuously improved with the data and there are ongoing efforts to identify potential improvements.", "AI agents respond to and design pull systems for all processes, including their own functions in the loop to value stream analysis.", "There are ongoing digital audits that identify and quantify value-added and non-value-added activities. AI agents are trained in problem-solving and root cause analysis. All areas of the business spend time identifying and resolving suspect root causes."] },
      { name: "Assure Quality at the Source", statements: ["There are ongoing digital audits that identify and quantify value-added and non-value-added activities. AI agents are trained in problem-solving and root cause analysis.", "AI agents are trained in problem-solving and root cause analysis. All areas of the business spend time identifying and resolving suspect root causes.", "Voice of the Customer is systematically processed through a combination of AI agents, data monitoring, and human review in the loop systems. Reactive and proactive systems are established."] },
      { name: "Seek Perfection", statements: ["Focus is on error proofing through the elimination of waste and non-value-added analysis. All areas of the business seek and resolve to zero defects.", "Leaders hold to the guiding principles 'customer first' systems built to enable AI agents to make decisions based on customer needs and customer feedback.", "Work process that enables them to monitor and maintain standard AI agent work. Continuous improvement system, cross-functional teams and AI agents, and analytics."] },
    ]
  },
  {
    name: "Dimension 3: Enterprise Alignment",
    color: "#D6EAF8",
    principles: [
      { name: "Create Constancy of Purpose", statements: ["There is a structured process for aligning AI agent mission, vision, values, goals, and strategic priorities that is linked to customer needs. AI agents are included in the process.", "Information systems provide direct and immediate information that enables AI agents to know how they are performing relative to the goals and priorities of the organization.", "Leaders and managers have a standard work process that enables them to monitor and maintain standard AI agent work. Continuous improvement system, cross-functional teams and AI agents, and analytics."] },
      { name: "Think Systemically", statements: ["Support functions are seamlessly integrated and supportive in achieving organizational goals and strategic priorities. AI agents are a common understanding of what is required and why it is important. (Tools: end-to-end value stream mapping, systems thinking)", "Cross flow of communication about daily work exists across all levels of the organization. AI agents are included. (Tools: tiered accountability, catchball, nemawashi, strategy deployment and 3) tracking against objectives)", "There is a system in place to monitor & evaluate metrics to ensure the right things are being measured. One-page strategic plans, balanced scorecard, OKRs, AI agents, and analytics."] },
      { name: "Create Value for the Customer", statements: ["Metrics are simple, aligned to the organization's goals, and drive improvement for all users. There is a common understanding of what is required and why it is measured. (Tools: end-to-end value stream mapping)", "There are systems in place to constantly monitor customer needs and rapidly translate them into new products and services. AI agents are included in the process. (Tools: QFD, VOC, Kano analysis)", "There is a system in place to monitor & evaluate metrics to ensure the right things are being measured. One-page strategic plans, balanced scorecard, OKRs, AI agents, and analytics."] },
    ]
  },
];

function App() {
  const [scores, setScores] = useState({});
  const [principleScores, setPrincipleScores] = useState({});
  const [dimensionScores, setDimensionScores] = useState({});

  const handleScoreChange = (dimensionIndex, principleIndex, statementIndex, value) => {
    setScores(prevScores => ({
      ...prevScores,
      [`${dimensionIndex}-${principleIndex}-${statementIndex}`]: value
    }));
  };

  useEffect(() => {
    // Calculate principle scores
    const newPrincipleScores = {};
    assessmentData.forEach((dimension, dimIndex) => {
      dimension.principles.forEach((principle, prinIndex) => {
        const principleScore = principle.statements.reduce((sum, _, stmtIndex) => {
          return sum + (scores[`${dimIndex}-${prinIndex}-${stmtIndex}`] || 0);
        }, 0);
        newPrincipleScores[`${dimIndex}-${prinIndex}`] = principleScore;
      });
    });
    setPrincipleScores(newPrincipleScores);

    // Calculate dimension scores
    const newDimensionScores = {};
    assessmentData.forEach((dimension, dimIndex) => {
      const dimensionScore = dimension.principles.reduce((sum, _, prinIndex) => {
        return sum + (newPrincipleScores[`${dimIndex}-${prinIndex}`] || 0);
      }, 0);
      newDimensionScores[dimIndex] = dimensionScore;
    });
    setDimensionScores(newDimensionScores);
  }, [scores]);

  const getSuggestions = (score, max) => {
    const percentage = (score / max) * 100;
    if (percentage < 33) {
      return "Significant improvement needed. Focus on understanding and implementing basic principles.";
    } else if (percentage < 66) {
      return "Good progress, but there's room for improvement. Identify weak areas and create action plans.";
    } else {
      return "Excellent performance. Continue to refine and innovate in these areas.";
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', marginBottom: '20px' }}>
        <h1 style={{ textAlign: 'center', marginTop: 0 }}>Operational Excellence Assessment: AI-Enhanced</h1>
        <div style={{ textAlign: 'center', fontSize: '0.9em' }}>
          <strong>Scoring Instructions:</strong> Score each of the behaviors below according to the scale below:<br />
          1 - Behavior is infrequent and rare; 2 - Behavior is event based and occurs irregularly; 3 - Behavior is frequent and common; 4 - Behavior is consistent and predominant; 5 - Behavior is constant and uniform
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, minmax(90px, 1fr))', gap: '2px' }}>
        {assessmentData.map((dimension, dimensionIndex) => (
          <React.Fragment key={`dimension-${dimensionIndex}`}>
            <div style={{
              gridColumn: `span ${dimension.principles.length}`,
              backgroundColor: dimension.color,
              padding: '5px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '0.8em',
              borderBottom: '1px solid #ccc'
            }}>
              {dimension.name}
            </div>
          </React.Fragment>
        ))}

        {assessmentData.map((dimension, dimensionIndex) => (
          <React.Fragment key={`dimension-slider-${dimensionIndex}`}>
            <div style={{
              gridColumn: `span ${dimension.principles.length}`,
              padding: '5px',
              textAlign: 'center',
              fontSize: '0.8em',
              borderBottom: '1px solid #ccc'
            }}>
              <p>Dimension Score: {dimensionScores[dimensionIndex] || 0} / {dimension.principles.length * 15}</p>
              <input
                type="range"
                min={dimension.principles.length * 3}
                max={dimension.principles.length * 15}
                value={dimensionScores[dimensionIndex] || 0}
                readOnly
                style={{ width: '100%' }}
              />
              <p>{getSuggestions(dimensionScores[dimensionIndex] || 0, dimension.principles.length * 15)}</p>
            </div>
          </React.Fragment>
        ))}

        {assessmentData.map((dimension, dimensionIndex) => (
          dimension.principles.map((principle, principleIndex) => (
            <React.Fragment key={`principle-${dimensionIndex}-${principleIndex}`}>
              <div style={{
                backgroundColor: dimension.color,
                padding: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '0.7em'
              }}>
                <h3 style={{ fontSize: '1em', textAlign: 'center', marginBottom: '5px' }}>{principle.name}</h3>
                <p>Principle Score: {principleScores[`${dimensionIndex}-${principleIndex}`] || 0} / 15</p>
                <input
                  type="range"
                  min="3"
                  max="15"
                  value={principleScores[`${dimensionIndex}-${principleIndex}`] || 0}
                  readOnly
                  style={{ width: '100%' }}
                />
                <p>{getSuggestions(principleScores[`${dimensionIndex}-${principleIndex}`] || 0, 15)}</p>
              </div>
            </React.Fragment>
          ))
        ))}

        {assessmentData.map((dimension, dimensionIndex) => (
          dimension.principles.map((principle, principleIndex) => (
            <div key={`principle-statements-${dimensionIndex}-${principleIndex}`} style={{
              backgroundColor: dimension.color,
              padding: '5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '0.7em'
            }}>
              {principle.statements.map((statement, statementIndex) => (
                <div key={`statement-${dimensionIndex}-${principleIndex}-${statementIndex}`} style={{
                  marginBottom: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <p style={{ marginBottom: '2px', textAlign: 'center' }}>{statement}</p>
                  <select
                    value={scores[`${dimensionIndex}-${principleIndex}-${statementIndex}`] || ''}
                    onChange={(e) => handleScoreChange(dimensionIndex, principleIndex, statementIndex, parseInt(e.target.value))}
                    style={{ width: '40px', fontSize: '0.9em' }}
                  >
                    <option value="">-</option>
                    {[1, 2, 3, 4, 5].map(score => (
                      <option key={score} value={score}>{score}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ))
        ))}
      </div>
    </div>
  );
}

export default App;