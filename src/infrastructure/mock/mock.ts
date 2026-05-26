/**
 * Datos mockeados para desarrollo
 */

export const mockUsers = [
  { id: "user-1", name: "Alice", password: "1234" },
  { id: "user-2", name: "Bob", password: "5678" },
]

export const widgetCatalog = [
  { id: "w1", name: "Vendas Totais", type: "kpi" },
  { id: "w2", name: "Receita do Mês", type: "kpi" },
  { id: "w3", name: "Clientes Ativos", type: "kpi" },
  { id: "w4", name: "Taxa de Conversão", type: "kpi" },
  { id: "w5", name: "Vendas por Região", type: "bar-chart" },
  { id: "w6", name: "Evolução Mensal", type: "line-chart" },
  { id: "w7", name: "Distribuição por Categoria", type: "pie-chart" },
  { id: "w8", name: "Principais Produtos", type: "table" },
  { id: "w9", name: "Últimas Transações", type: "table" },
  { id: "w10", name: "Resumo da Equipe", type: "table" },
]

// Datos mockeados para cada tipo de widget
export const widgetData: Record<string, unknown> = {
  // KPI widgets
  "w1": {
    value: "$1.234.567",
    variation: "+12,5%",
    variationPositive: true,
    detail: "vs mês anterior: $1.097.384",
    subtitle: "Total acumulado"
  },
  "w2": {
    value: "$456.789",
    variation: "+8,3%",
    variationPositive: true,
    detail: "Meta mensal: $500.000",
    subtitle: "Este mês"
  },
  "w3": {
    value: "2.847",
    variation: "-2,1%",
    variationPositive: false,
    detail: "Novos: 156 | Recorrentes: 2.691",
    subtitle: "Usuários ativos"
  },
  "w4": {
    value: "3,8%",
    variation: "+0,5%",
    variationPositive: true,
    detail: "Média dos últimos 6 meses: 3,3%",
    subtitle: "Taxa de conversão"
  },
  
  // Bar chart widget
  "w5": {
    labels: ["Norte", "Sul", "Leste", "Oeste", "Central"],
    values: [45000, 32000, 58000, 41000, 52000],
    colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
  },
  
  // Line chart widget
  "w6": {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    values: [120000, 135000, 128000, 142000, 158000, 175000],
    color: "#3b82f6"
  },
  
  // Pie chart widget
  "w7": {
    labels: ["Eletrônicos", "Roupas", "Casa", "Esportes", "Outros"],
    values: [35, 25, 20, 12, 8],
    colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
  },
  
  // Table widgets
  "w8": {
    headers: ["Produto", "Vendas", "Receita", "Tendência"],
    rows: [
      ["iPhone 15 Pro", 234, "$234.000", "↑"],
      ["MacBook Air", 189, "$189.000", "↑"],
      ["AirPods Pro", 456, "$68.400", "→"],
      ["iPad Pro", 123, "$123.000", "↓"],
      ["Apple Watch", 287, "$57.400", "↑"]
    ]
  },
  "w9": {
    headers: ["ID", "Cliente", "Valor", "Data"],
    rows: [
      ["TX-001", "Alice Johnson", "$1.250", "15/01/2024"],
      ["TX-002", "Bob Smith", "$890", "15/01/2024"],
      ["TX-003", "Carol Davis", "$2.340", "14/01/2024"],
      ["TX-004", "David Wilson", "$567", "14/01/2024"],
      ["TX-005", "Emma Brown", "$1.890", "13/01/2024"]
    ]
  },
  "w10": {
    headers: ["Membro", "Cargo", "Vendas", "Meta"],
    rows: [
      ["Alice Johnson", "Sênior", "$45.000", "$50.000"],
      ["Bob Smith", "Pleno", "$32.000", "$35.000"],
      ["Carol Davis", "Sênior", "$52.000", "$45.000"],
      ["David Wilson", "Júnior", "$18.000", "$25.000"],
      ["Emma Brown", "Pleno", "$38.000", "$40.000"]
    ]
  }
}

export const defaultLayout = [
  { i: "w1", x: 0, y: 0, w: 3, h: 2 },
  { i: "w2", x: 3, y: 0, w: 3, h: 2 },
  { i: "w3", x: 6, y: 0, w: 3, h: 2 },
  { i: "w4", x: 9, y: 0, w: 3, h: 2 },
  { i: "w5", x: 0, y: 2, w: 6, h: 4 },
  { i: "w6", x: 6, y: 2, w: 6, h: 4 },
  { i: "w7", x: 0, y: 6, w: 4, h: 4 },
  { i: "w8", x: 4, y: 6, w: 8, h: 4 },
  { i: "w9", x: 0, y: 10, w: 6, h: 4 },
  { i: "w10", x: 6, y: 10, w: 6, h: 4 },
]

export const mockData: any[] = [];