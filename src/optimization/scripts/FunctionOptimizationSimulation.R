library("babsim.hospital")

args <- commandArgs(trailingOnly = TRUE)
if (length(args) == 0) {
    err_msg <- "The 29 simulator parameters are needed as arguments.\nExample: pathToScript/FunctionOptimizationSimulation.R  13 9 4 7 4 7 4 6 31 20 4 3 1.025122034383019 0.09948852474437592 0.10792190546870738 0.011173293404359304 0.0817632221946115 0.001797158613580871 0.09993614034820439 0.26068035962145947 0.08496138324965977 0.5390764291554987 0.007022805782825558 3 0.5251115371385421 0.03026528551276313 1 4 0.7184313987846556\n\n"
    stop(err_msg)
}
parameters <- as.numeric(args[1:29])

region = 5315 #5374 Germany, 5315 is Cologne, 5 is NRW
seed = 123
simrepeats = 1
parallel = FALSE
percCores = 0.8
resourceNames =  c('intensiveBed', 'intensiveBedVentilation')
resourceEval = c('intensiveBed', 'intensiveBedVentilation') 
FieldStartDate = '2020-09-01'
icudata <- getRegionIcu(data = icudata, region = region)
fieldData <- getIcuBeds(icudata)
fieldData <- fieldData[which(fieldData$Day >= as.Date(FieldStartDate)), ]
rownames(fieldData) <- NULL
icu = TRUE
icuWeights = c(1,1)
SimStartDate = '2020-08-01'
rkidata <- getRegionRki(data = rkidata, region = region)
simData <- getRkiData(rkidata)
simData <- simData[which(simData$Day >= as.Date(SimStartDate)), ]
simData <- simData[as.Date(simData$Day) <= max(as.Date(fieldData$Day)),]
## time must start at 1
simData$time <- simData$time - min(simData$time)
rownames(simData) <- NULL
data <- list(simData = simData, fieldData = fieldData)
conf <- babsimToolsConf()
conf <- getConfFromData(conf = conf,
                        simData = data$simData,
                        fieldData = data$fieldData)
conf$parallel = parallel
conf$simRepeats = simrepeats
conf$ICU = icu
conf$ResourceNames = resourceNames
conf$ResourceEval = resourceEval
conf$percCores = percCores
conf$logLevel = 0
conf$w2 = icuWeights
set.seed(conf$seed)
opt <- funOptimizeSim(x = parameters, conf = conf, data = data)
opt
