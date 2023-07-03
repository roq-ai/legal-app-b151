const mapping: Record<string, string> = {
  clients: 'client',
  firms: 'firm',
  'performance-evaluations': 'performance_evaluation',
  'time-trackings': 'time_tracking',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
