import React from 'react';
import * as d3 from 'd3';

export enum NodeType {
  SUBJECT = 'Subject',
  TOPIC = 'Topic',
  CONCEPT = 'Concept',
  SKILL = 'Skill',
  MISCONCEPTION = 'Misconception',
  RESOURCE = 'Resource',
  QUESTION = 'Question'
}

export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: NodeType;
  val: number; // For radius size
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  relation: 'PART_OF' | 'REQUIRES' | 'RELATED_TO' | 'HAS_MISCONCEPTION' | 'ASSESSES' | 'TRAPS' | 'EXPLAINS';
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}
