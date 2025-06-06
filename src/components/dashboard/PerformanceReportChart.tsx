"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useState, useEffect } from 'react';

const weeklyData = [ // Renamed from data
  { name: 'Mon', uv: 40 }, // Shortened names for better fit
  { name: 'Tue', uv: 30 },
  { name: 'Wed', uv: 60 },
  { name: 'Thu', uv: 50 },
  { name: 'Fri', uv: 70 },
  { name: 'Sat', uv: 45 },
  { name: 'Sun', uv: 55 },
];

const dailyData = [
  { name: '12AM', uv: 10 }, { name: '3AM', uv: 15 }, { name: '6AM', uv: 30 }, 
  { name: '9AM', uv: 50 }, { name: '12PM', uv: 65 }, { name: '3PM', uv: 55 }, 
  { name: '6PM', uv: 40 }, { name: '9PM', uv: 25 },
];

const monthlyData = [
  { name: 'Week 1', uv: 150 }, { name: 'Week 2', uv: 200 }, 
  { name: 'Week 3', uv: 180 }, { name: 'Week 4', uv: 220 },
];

// Helper to get max UV for dynamic Y-axis (optional, for future enhancement)
// const getMaxUv = (data: { name: string; uv: number }[]) => {
//   return Math.max(...data.map(item => item.uv), 0) + 10; // Add some padding
// };

const data = [ // This will be replaced by state
  { name: 'Monday', uv: 40 },
  { name: 'Tuesday', uv: 30 },
  { name: 'Wednesday', uv: 60 },
  { name: 'Thursday', uv: 50 },
  { name: 'Friday', uv: 70 },
  { name: 'Saturday', uv: 45 },
  { name: 'Sunday', uv: 55 },
];

export function PerformanceReportChart() {
  const [selectedRange, setSelectedRange] = useState('weekly');
  const [currentChartData, setCurrentChartData] = useState(weeklyData);
  // const [yAxisMax, setYAxisMax] = useState(80); // For dynamic Y-axis

  useEffect(() => {
    let newData;
    // let newYMax = 80; // Default Y-axis max
    switch (selectedRange) {
      case 'daily':
        newData = dailyData;
        // newYMax = getMaxUv(dailyData);
        break;
      case 'monthly':
        newData = monthlyData;
        // newYMax = getMaxUv(monthlyData);
        break;
      case 'weekly':
      default:
        newData = weeklyData;
        // newYMax = getMaxUv(weeklyData);
        break;
    }
    setCurrentChartData(newData);
    // setYAxisMax(newYMax); // For dynamic Y-axis
  }, [selectedRange]);

  return (
    <Card className="shadow-none border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">Performance Report</CardTitle>
          <Select value={selectedRange} onValueChange={setSelectedRange}>
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="h-[300px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
            />
            <YAxis 
              domain={[0, 80]} 
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                color: 'hsl(var(--foreground))'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
              formatter={(value: number) => [`${value}`, "Value"]}
            />
            <Area type="monotone" dataKey="uv" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUv)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
