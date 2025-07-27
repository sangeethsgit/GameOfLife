import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const CommunityGraph = ({ data }) => {
  return (
    <div className="graph-wrapper">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="points" fill="#00b894" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommunityGraph;
