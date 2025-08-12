const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

const instrumentations = getNodeAutoInstrumentations({
    '@opentelemetry/instrumentation-express': { enabled: true },
    '@opentelemetry/instrumentation-pg': { enabled: true },
    '@opentelemetry/instrumentation-redis': { enabled: true },
    '@opentelemetry/instrumentation-grpc': { enabled: true },    
});

const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter({
        url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://tempo:4317',
    }),
    instrumentations,
    serviceName: process.env.OTEL_SERVICE_NAME || 'user-service',
});


function initTracing(){
    sdk.start();
    console.log('OpenTelemetry tracing initialized'); // Console log for early feedback
    process.on('SIGTERM', () => {
        sdk
          .shutdown()
          .then(() => console.log('OpenTelemetry tracing shut down'))
          .catch((error) => console.error('Error shutting down OpenTelemetry:', error))
          .finally(() => process.exit(0));
      });
}

// Initialize tracing immediately
initTracing();

module.exports = { initTracing };