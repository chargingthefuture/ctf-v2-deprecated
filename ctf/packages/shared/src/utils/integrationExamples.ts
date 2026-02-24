import {
  MetricCheckStatus,
  checkMetricDefined,
  type BlockingMetricDefinitionRequest,
  type CanonicalMetricEntry
} from "./checkMetricDefined";

const toBlockingIssueComment = (request: BlockingMetricDefinitionRequest): string => {
  const matchText = request.matches?.length
    ? `\nPotential matches: ${request.matches.map((match) => `${match.id} (${match.name})`).join(", ")}`
    : "";

  return [
    request.title,
    request.message,
    `Canonical registry: ${request.links.canonical_metrics}`,
    `Metric template: ${request.links.template}`,
    ...request.suggested_questions.questions,
    matchText
  ]
    .filter(Boolean)
    .join("\n");
};

const requireDefinedMetric = async (
  metricIdentifier: string,
  caller: string
): Promise<CanonicalMetricEntry> => {
  const result = await checkMetricDefined(metricIdentifier, { caller });
  if (result.status === MetricCheckStatus.FOUND) {
    return result.entry;
  }

  const blockingComment = toBlockingIssueComment(result.blocking_request);
  throw new Error(blockingComment);
};

export const createAlertRule = async (metricIdentifier: string): Promise<string> => {
  const metric = await requireDefinedMetric(metricIdentifier, "alerts.createAlertRule");
  return `Create alert for ${metric.id} using thresholds: ${JSON.stringify(metric.allowed_thresholds ?? {})}`;
};

export const writeEtlTransformOrSparkJob = async (metricIdentifier: string): Promise<string> => {
  const metric = await requireDefinedMetric(metricIdentifier, "etl.writeEtlTransformOrSparkJob");
  return `Generate ETL/Spark transform with canonical calculation: ${metric.calculation}`;
};

export const addMetricSchemaColumn = async (metricIdentifier: string): Promise<string> => {
  const metric = await requireDefinedMetric(metricIdentifier, "schema.addMetricSchemaColumn");
  return `Add schema column for ${metric.id} with data_type=${metric.data_type} and unit=${metric.unit}`;
};

export const generateDashboardWidgetOrPrometheusMetric = async (
  metricIdentifier: string
): Promise<string> => {
  const metric = await requireDefinedMetric(
    metricIdentifier,
    "dashboard.generateDashboardWidgetOrPrometheusMetric"
  );
  return `Generate dashboard widget and Prometheus export mapping for ${metric.id}`;
};
