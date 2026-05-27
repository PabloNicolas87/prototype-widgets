/**
 * Datos mockeados para desarrollo
 */

export const mockUsers = [
  { id: "user-1", name: "Alice", password: "1234" },
  { id: "user-2", name: "Bob", password: "5678" },
]

// Catálogo de widgets específicos por dashboard
export const widgetCatalog = [
  // Widgets de Vendas (v1-v10)
  { id: "v1", name: "Vendas Totais", type: "kpi", dashboardId: "dashboard-vendas" },
  { id: "v2", name: "Receita do Mês", type: "kpi", dashboardId: "dashboard-vendas" },
  { id: "v3", name: "Pedidos Pendentes", type: "kpi", dashboardId: "dashboard-vendas" },
  { id: "v4", name: "Ticket Médio", type: "kpi", dashboardId: "dashboard-vendas" },
  { id: "v5", name: "Vendas por Região", type: "bar-chart", dashboardId: "dashboard-vendas" },
  { id: "v6", name: "Evolução de Vendas", type: "line-chart", dashboardId: "dashboard-vendas" },
  { id: "v7", name: "Vendas por Categoria", type: "pie-chart", dashboardId: "dashboard-vendas" },
  { id: "v8", name: "Top Produtos", type: "table", dashboardId: "dashboard-vendas" },
  { id: "v9", name: "Últimas Vendas", type: "table", dashboardId: "dashboard-vendas" },
  { id: "v10", name: "Performance Vendedores", type: "table", dashboardId: "dashboard-vendas" },
  
  // Widgets de Marketing (m1-m10)
  { id: "m1", name: "Leads Gerados", type: "kpi", dashboardId: "dashboard-marketing" },
  { id: "m2", name: "Taxa de Conversão", type: "kpi", dashboardId: "dashboard-marketing" },
  { id: "m3", name: "Custo por Lead", type: "kpi", dashboardId: "dashboard-marketing" },
  { id: "m4", name: "ROI Campanhas", type: "kpi", dashboardId: "dashboard-marketing" },
  { id: "m5", name: "Leads por Canal", type: "bar-chart", dashboardId: "dashboard-marketing" },
  { id: "m6", name: "Evolução Leads", type: "line-chart", dashboardId: "dashboard-marketing" },
  { id: "m7", name: "Distribuição Leads", type: "pie-chart", dashboardId: "dashboard-marketing" },
  { id: "m8", name: "Campanhas Ativas", type: "table", dashboardId: "dashboard-marketing" },
  { id: "m9", name: "Funil de Conversão", type: "table", dashboardId: "dashboard-marketing" },
  { id: "m10", name: "Performance Canais", type: "table", dashboardId: "dashboard-marketing" },
  
  // Widgets de Financeiro (f1-f10)
  { id: "f1", name: "Fluxo de Caixa", type: "kpi", dashboardId: "dashboard-financeiro" },
  { id: "f2", name: "Despesas do Mês", type: "kpi", dashboardId: "dashboard-financeiro" },
  { id: "f3", name: "Lucro Líquido", type: "kpi", dashboardId: "dashboard-financeiro" },
  { id: "f4", name: "Margem de Lucro", type: "kpi", dashboardId: "dashboard-financeiro" },
  { id: "f5", name: "Receitas por Categoria", type: "bar-chart", dashboardId: "dashboard-financeiro" },
  { id: "f6", name: "Evolução Financeira", type: "line-chart", dashboardId: "dashboard-financeiro" },
  { id: "f7", name: "Distribuição Despesas", type: "pie-chart", dashboardId: "dashboard-financeiro" },
  { id: "f8", name: "Transações Recentes", type: "table", dashboardId: "dashboard-financeiro" },
  { id: "f9", name: "Contas a Pagar", type: "table", dashboardId: "dashboard-financeiro" },
  { id: "f10", name: "Contas a Receber", type: "table", dashboardId: "dashboard-financeiro" },
]

// Datos mockeados para cada tipo de widget
export const widgetData: Record<string, unknown> = {
  // KPI widgets de Vendas
  "v1": {
    value: "$1.234.567",
    variation: "+12,5%",
    variationPositive: true,
    detail: "vs mês anterior: $1.097.384",
    subtitle: "Total acumulado"
  },
  "v2": {
    value: "$456.789",
    variation: "+8,3%",
    variationPositive: true,
    detail: "Meta mensal: $500.000",
    subtitle: "Este mês"
  },
  "v3": {
    value: "234",
    variation: "-5,2%",
    variationPositive: false,
    detail: "Meta: < 200",
    subtitle: "Pedidos pendentes"
  },
  "v4": {
    value: "$285",
    variation: "+3,1%",
    variationPositive: true,
    detail: "Meta: $300",
    subtitle: "Ticket médio"
  },
  
  // KPI widgets de Marketing
  "m1": {
    value: "2.847",
    variation: "+15,2%",
    variationPositive: true,
    detail: "Meta mensal: 2.500",
    subtitle: "Leads gerados"
  },
  "m2": {
    value: "3,8%",
    variation: "+0,5%",
    variationPositive: true,
    detail: "Meta: 4,0%",
    subtitle: "Taxa de conversão"
  },
  "m3": {
    value: "$45,20",
    variation: "-2,1%",
    variationPositive: true,
    detail: "Meta: <$50",
    subtitle: "Custo por lead"
  },
  "m4": {
    value: "320%",
    variation: "+25,0%",
    variationPositive: true,
    detail: "Meta: 300%",
    subtitle: "ROI campanhas"
  },
  
  // KPI widgets de Financeiro
  "f1": {
    value: "$890.450",
    variation: "+5,8%",
    variationPositive: true,
    detail: "vs mês anterior: $841.200",
    subtitle: "Fluxo de caixa"
  },
  "f2": {
    value: "$234.567",
    variation: "+3,2%",
    variationPositive: false,
    detail: "Orçamento: $250.000",
    subtitle: "Despesas do mês"
  },
  "f3": {
    value: "$655.883",
    variation: "+7,5%",
    variationPositive: true,
    detail: "Meta: $600.000",
    subtitle: "Lucro líquido"
  },
  "f4": {
    value: "73,6%",
    variation: "+1,2%",
    variationPositive: true,
    detail: "Meta: 75%",
    subtitle: "Margem de lucro"
  },
  
  // Bar chart widgets
  "v5": {
    labels: ["Norte", "Sul", "Leste", "Oeste", "Central"],
    values: [45000, 32000, 58000, 41000, 52000],
    colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
  },
  "m5": {
    labels: ["Google Ads", "Facebook", "LinkedIn", "Email", "Orgânico"],
    values: [850, 620, 340, 480, 557],
    colors: ["#ea4335", "#1877f2", "#0077b5", "#f59e0b", "#10b981"]
  },
  "f5": {
    labels: ["Produtos", "Serviços", "Licenças", "Consultoria", "Suporte"],
    values: [450000, 250000, 120000, 50000, 20450],
    colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
  },
  
  // Line chart widgets
  "v6": {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    values: [120000, 135000, 128000, 142000, 158000, 175000],
    color: "#3b82f6"
  },
  "m6": {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    values: [1800, 2100, 1950, 2400, 2650, 2847],
    color: "#10b981"
  },
  "f6": {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    values: [720000, 780000, 750000, 810000, 850000, 890450],
    color: "#f59e0b"
  },
  
  // Pie chart widgets
  "v7": {
    labels: ["Eletrônicos", "Roupas", "Casa", "Esportes", "Outros"],
    values: [35, 25, 20, 12, 8],
    colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
  },
  "m7": {
    labels: ["Qualificados", "Em negociação", "Frios", "Descartados"],
    values: [35, 25, 30, 10],
    colors: ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"]
  },
  "f7": {
    labels: ["Pessoal", "Marketing", "Operacional", "TI", "Outros"],
    values: [40, 20, 18, 12, 10],
    colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
  },
  
  // Table widgets de Vendas
  "v8": {
    headers: ["Produto", "Vendas", "Receita", "Tendência"],
    rows: [
      ["iPhone 15 Pro", 234, "$234.000", "↑"],
      ["MacBook Air", 189, "$189.000", "↑"],
      ["AirPods Pro", 456, "$68.400", "→"],
      ["iPad Pro", 123, "$123.000", "↓"],
      ["Apple Watch", 287, "$57.400", "↑"]
    ]
  },
  "v9": {
    headers: ["ID", "Cliente", "Valor", "Data"],
    rows: [
      ["V-001", "Alice Johnson", "$1.250", "15/01/2024"],
      ["V-002", "Bob Smith", "$890", "15/01/2024"],
      ["V-003", "Carol Davis", "$2.340", "14/01/2024"],
      ["V-004", "David Wilson", "$567", "14/01/2024"],
      ["V-005", "Emma Brown", "$1.890", "13/01/2024"]
    ]
  },
  "v10": {
    headers: ["Vendedor", "Vendas", "Meta", "Performance"],
    rows: [
      ["Alice Johnson", "$45.000", "$50.000", "90%"],
      ["Bob Smith", "$52.000", "$45.000", "116%"],
      ["Carol Davis", "$38.000", "$40.000", "95%"],
      ["David Wilson", "$28.000", "$30.000", "93%"],
      ["Emma Brown", "$42.000", "$40.000", "105%"]
    ]
  },
  
  // Table widgets de Marketing
  "m8": {
    headers: ["Campanha", "Leads", "Custo", "ROI"],
    rows: [
      ["Black Friday", 850, "$12.500", "340%"],
      ["Verão 2024", 620, "$8.200", "280%"],
      ["Email Marketing", 480, "$1.800", "420%"],
      ["Google Ads", 340, "$6.800", "250%"],
      ["LinkedIn Ads", 557, "$9.500", "310%"]
    ]
  },
  "m9": {
    headers: ["Etapa", "Leads", "Conversão", "Tempo médio"],
    rows: [
      ["Visitantes", "5.000", "100%", "-"],
      ["Leads", "2.847", "57%", "1 dia"],
      ["Qualificados", "996", "35%", "3 dias"],
      ["Oportunidades", 399, "40%", "5 dias"],
      ["Clientes", 108, "27%", "7 dias"]
    ]
  },
  "m10": {
    headers: ["Canal", "Leads", "Custo/Lead", "Qualidade"],
    rows: [
      ["Google Ads", 340, "$20.00", "Alta"],
      ["Facebook", 620, "$13.16", "Média"],
      ["LinkedIn", 557, "$17.06", "Alta"],
      ["Email", 480, "$3.75", "Média"],
      ["Orgânico", 557, "$0.00", "Baixa"]
    ]
  },
  
  // Table widgets de Financeiro
  "f8": {
    headers: ["ID", "Tipo", "Valor", "Data"],
    rows: [
      ["T-001", "Receita", "$15.000", "15/01/2024"],
      ["T-002", "Despesa", "$3.500", "15/01/2024"],
      ["T-003", "Receita", "$8.900", "14/01/2024"],
      ["T-004", "Despesa", "$2.100", "14/01/2024"],
      ["T-005", "Receita", "$12.340", "13/01/2024"]
    ]
  },
  "f9": {
    headers: ["Fornecedor", "Valor", "Vencimento", "Status"],
    rows: [
      ["Tech Solutions", "$8.500", "20/01/2024", "Pendente"],
      ["Office Supplies", "$1.200", "18/01/2024", "Pendente"],
      ["Marketing Pro", "$5.600", "25/01/2024", "Pendente"],
      ["Cloud Services", "$2.800", "15/01/2024", "Atrasado"],
      ["Consulting Co", "$12.000", "30/01/2024", "Pendente"]
    ]
  },
  "f10": {
    headers: ["Cliente", "Valor", "Vencimento", "Status"],
    rows: [
      ["Empresa A", "$25.000", "20/01/2024", "Pendente"],
      ["Empresa B", "$15.000", "18/01/2024", "Pendente"],
      ["Empresa C", "$8.900", "25/01/2024", "Pendente"],
      ["Empresa D", "$32.000", "15/01/2024", "Atrasado"],
      ["Empresa E", "$18.500", "30/01/2024", "Pendente"]
    ]
  }
}

export const mockData: any[] = [];