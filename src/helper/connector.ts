import HTTPClient from 'axios'

HTTPClient.defaults.headers['Content-Type'] = 'application/json'


type RetryLogicType =
  | 'FIXED' // Reschedule the task after the retryDelaySeconds
  | 'EXPONENTIAL_BACKOFF' // Reschedule after retryDelaySeconds  * attemptNumber


type TaskTimeoutPolicyType =
  | 'RETRY' // Retries the task again
  | 'TIME_OUT_WF' // Workflow is marked as TIMED_OUT and terminated
  | 'ALERT_ONLY' // Registers a counter(task_timeout)


type WorkflowTimeoutPolicyType =
  | 'TIME_OUT_WF' // Workflow is marked as TIMED_OUT and terminated
  | 'ALERT_ONLY' // Registers a counter(task_timeout)

export type WorkflowTaskType =
  | 'SWITCH'
  | 'SIMPLE'
  | 'WAIT'
  /** @deprecated use switch instead */
  | 'DECISION'
  | 'SUB_WORKFLOW'
  | 'JOIN'
  | 'FORK_JOIN'
  | 'FORK_JOIN_DYNAMIC'
  | 'EXCLUSIVE_JOIN'
  | 'DYNAMIC'
  /** @deprecated use inline instead*/
  | 'LAMBDA'
  | 'INLINE'
  | 'TERMINATE'
  | 'KAFKA_PUBLISH'
  | 'DO_WHILE'
  | 'SET_VARIABLE'




export type TaskDefinition = {
  ownerEmail: string;
  name: string;
  description?: string;
  retryCount?: number;
  timeoutSeconds?: number;
  inputKeys?: string[];
  outputKeys?: string[];
  timeoutPolicy?: TaskTimeoutPolicyType;
  retryLogic?: RetryLogicType;
  retryDelaySeconds?: number;
  responseTimeoutSeconds?: number;
  concurrentExecLimit?: number;
  rateLimitFrequencyInSeconds?: number;
  rateLimitPerFrequency?: number;
  [key: string]: any;
}


export declare interface WorkflowTaskDefinition {
  name: string;
  taskReferenceName: string;
  /**
   * Skip those type that has own declaration
   */
  type: Omit<WorkflowTaskType, 'SWITCH' | 'JOIN' | 'DECISION'>;
  inputParameters?: any;
  startDelay?: number;
  optional?: boolean;
  /** 
   * for documentation 
   * @warn will not be save to conductor server
   */
  comment?: string
};

export declare interface WorkflowSubWorkflowTaskDefinition extends WorkflowTaskDefinition {
  subWorkflowParam: {
    name: string
    version: number
  }
}

export declare interface WorkflowForkTaskDefinition extends WorkflowTaskDefinition {
  forkTasks: (GeneralWorkflowTaskDefinition[])[]
}

export declare interface WorkflowJoinTaskDefinition extends WorkflowTaskDefinition {
  type: 'JOIN',
  joinOn: string[]
}

export declare interface WorkflowDecisionTaskDefinition extends WorkflowTaskDefinition {
  type: 'DECISION',
  caseValueParam?: string
  caseExpression?: string;
  defaultCase?: GeneralWorkflowTaskDefinition[]
  decisionCases?: { [key: string]: GeneralWorkflowTaskDefinition[] }
};

export declare interface WorkflowSwitchTaskDefinition extends WorkflowTaskDefinition {
  type: 'SWITCH',
  evaluatorType?: 'value-param' | 'javascript'
  expression?: string;
  defaultCase?: GeneralWorkflowTaskDefinition[]
  decisionCases?: { [key: string]: GeneralWorkflowTaskDefinition[] }
};

export declare type GeneralWorkflowTaskDefinition =
  | WorkflowTaskDefinition
  | WorkflowDecisionTaskDefinition
  | WorkflowSwitchTaskDefinition
  | WorkflowForkTaskDefinition
  | WorkflowJoinTaskDefinition
  | WorkflowSubWorkflowTaskDefinition


export type WorkflowDefinition = {
  name: string
  description: string
  version: number
  tasks: GeneralWorkflowTaskDefinition[]
  outputParameters?: any
  inputParameters: any
  failureWorkflow?: string
  restartable?: boolean
  workflowStatusListenerEnabled?: boolean
  schemaVersion: number
  ownerEmail: string
  timeoutPolicy?: WorkflowTimeoutPolicyType
}

export type Task = {
  taskType: string,
  status: TaskStatus,
  inputData: any,
  referenceTaskName: string,
  retryCount: number,
  seq: number,
  correlationId: string,
  pollCount: number,
  taskDefName: string,
  scheduledTime: number,
  startTime: number,
  endTime: number,
  updateTime: number,
  startDelayInSeconds: number,
  retriedTaskId: string,
  retried: boolean,
  executed: boolean,
  callbackFromWorker: boolean,
  responseTimeoutSeconds: number,
  workflowInstanceId: string,
  workflowType: string,
  taskId: string,
  reasonForIncompletion: string,
  callbackAfterSeconds: number,
  workerId: string,
  outputData: any,
  workflowTask: {
    name: string,
    taskReferenceName: string,
    description: string,
    inputParameters: any,
    type: string,
    dynamicTaskNameParam: string,
    caseValueParam: string,
    caseExpression: string,
    scriptExpression: string,
    decisionCases: any,
    dynamicForkTasksParam: string,
    dynamicForkTasksInputParamName: string,
    defaultCase: any,
    forkTasks: any,
    startDelay: number,
    subWorkflowParam: {
      name: string,
      version: number,
      taskToDomain: any
    },
    joinOn: [
      string
    ],
    sink: string,
    optional: boolean,
    taskDefinition: {
      ownerApp: string,
      createTime: number,
      updateTime: number,
      createdBy: string,
      updatedBy: string,
      name: string,
      description: string,
      retryCount: number,
      timeoutSeconds: number,
      inputKeys: [
        string
      ],
      outputKeys: [
        string
      ],
      timeoutPolicy: "RETRY" | "TIME_OUT_WF" | "ALERT_ONLY",
      retryLogic: RetryLogicType,
      retryDelaySeconds: number,
      responseTimeoutSeconds: number,
      concurrentExecLimit: number,
      inputTemplate: any,
      rateLimitPerFrequency: number,
      rateLimitFrequencyInSeconds: number,
      isolationGroupId: string,
      executionNameSpace: string,
      ownerEmail: string,
      pollTimeoutSeconds: number
    },
    rateLimited: boolean,
    defaultExclusiveJoinTask: [
      string
    ],
    asyncComplete: boolean,
    loopCondition: string,
    loopOver: [
      null
    ],
    retryCount: number
  },
  domain: string,
  rateLimitPerFrequency: number,
  rateLimitFrequencyInSeconds: number,
  externalInputPayloadStoragePath: string,
  externalOutputPayloadStoragePath: string,
  workflowPriority: number,
  executionNameSpace: string,
  isolationGroupId: string,
  iteration: number,
  subWorkflowId: string,
  subworkflowChanged: boolean,
  taskDefinition: TaskDefinition,
  loopOverTask: boolean,
  queueWaitTime: number
}

export type Workflow = {
  ownerApp: string,
  createTime: number,
  updateTime: number,
  createdBy: string,
  updatedBy: string,
  status: WorkflowStatus,
  endTime: number,
  workflowId: string,
  parentWorkflowId: string,
  parentWorkflowTaskId: string,
  tasks?: Task[],
  input: any,
  output: any,
  correlationId: string,
  reRunFromWorkflowId: string,
  reasonForIncompletion: string,
  event: string,
  taskToDomain: any,
  failedReferenceTaskNames: [
    string
  ],
  workflowDefinition: WorkflowDefinition,
  externalInputPayloadStoragePath: string,
  externalOutputPayloadStoragePath: string,
  priority: number,
  variables: any,
  lastRetriedTime: number,
  startTime: number,
  workflowName: string,
  workflowVersion: number
}

export enum WorkflowStatus {
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETE = 'COMPLETED',
  TIMED_OUT = 'TIMED_OUT',
  TERMINATED = 'TERMINATED'
}

export enum TaskStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED'
}

export type TaskBody = {
  workflowInstanceId: string
  taskId: string
  reasonForIncompletion?: string
  callbackAfterSeconds?: number
  status: TaskStatus
  outputData?: any
}

export type TaskData = {
  taskType: string
  status: string
  inputData: any
  referenceTaskName: string
  retryCount: number
  seq: number
  pollCount: number
  taskDefName: string
  scheduledTime: number
  startTime: number
  endTime: number
  updateTime: number
  startDelayInSeconds: number
  retried: boolean
  executed: boolean
  callbackFromWorker: boolean
  responseTimeoutSeconds: number
  workflowInstanceId: string
  workflowType: string
  taskId: string
  callbackAfterSeconds: number
  outputData: any
  workflowTask: {
    name: string
    taskReferenceName: string
    type: string
    inputParameters: any
    startDelay: number
    optional: boolean
    taskDefinition: TaskDefinition
  }
  rateLimitPerFrequency: number
  rateLimitFrequencyInSeconds: number
  taskDefinition: any
  taskStatus: string
  queueWaitTime: number
  logs: [string]
}

export const getWorkflowDefinition = (baseURL: string, workflowName: string, version: number = 1) =>
  HTTPClient({
    method: 'get',
    baseURL,
    url: `/metadata/workflow/${workflowName}`,
    params: {
      version
    }
  })

export function createWorkflowDef(baseURL: string, workflowDefBody: WorkflowDefinition) {
  return HTTPClient({
    method: 'post',
    baseURL,
    url: '/metadata/workflow',
    data: workflowDefBody
  })
}

export function updateWorkflowDefs(baseURL: string, workflowDefsBody: [WorkflowDefinition]) {
  return HTTPClient({
    method: 'put',
    baseURL,
    url: '/metadata/workflow',
    data: workflowDefsBody
  })
}

export function getAllWorkflowDefs(baseURL: string) {
  return HTTPClient({
    method: 'get',
    baseURL,
    url: '/metadata/workflow'
  })
}

export function unRegisterWorkflowDef(
  baseURL: string,
  workflowDefName: string,
  version: number = 1
) {
  return HTTPClient({
    method: 'delete',
    baseURL,
    url: `/metadata/workflow/${workflowDefName}/${version}`,
    params: {
      version
    }
  })
}

export function getTaskDef(baseURL: string, taskDefName: string) {
  return HTTPClient({
    method: 'get',
    baseURL,
    url: `/metadata/taskdefs/${taskDefName}`
  })
}

export function registerTaskDefs(baseURL: string, taskDefsMeta: [TaskDefinition]) {
  return HTTPClient({
    method: 'post',
    baseURL,
    url: '/metadata/taskdefs',
    data: taskDefsMeta
  })
}

export function updateTaskDef(baseURL: string, taskDefMeta: TaskDefinition) {
  return HTTPClient({
    method: 'put',
    baseURL,
    url: '/metadata/taskdefs',
    data: taskDefMeta
  })
}

export function unRegisterTaskDef(baseURL: string, taskDefName: string) {
  return HTTPClient({
    method: 'delete',
    baseURL,
    url: `/metadata/taskdefs/${taskDefName}`
  })
}

export function getAllTaskDefs(baseURL: string) {
  return HTTPClient({
    method: 'get',
    baseURL,
    url: '/metadata/taskdefs'
  })
}

/** ********************/
/* Task Functions	  */
/** ********************/

export function getTask(baseURL: string, taskID: string) {
  return HTTPClient({
    method: 'get',
    baseURL,
    url: `/tasks/${taskID}`
  })
}

export function updateTask(baseURL: string, taskBody: TaskBody) {
  return HTTPClient({
    method: 'post',
    baseURL,
    url: '/tasks',
    data: taskBody
  })
}

export function pollForTask(baseURL: string, taskType: string, workerID: string) {
  return HTTPClient({
    method: 'get',
    baseURL,
    url: `/tasks/poll/${taskType}`,
    params: {
      workerid: workerID
    }
  })
}

export function pollForTasks(
  baseURL: string,
  taskType: string,
  workerID: string,
  count: number = 1,
  domain: string = undefined
) {
  const params: any = {
    workerid: workerID,
    count
  }
  if (domain) {
    params.domain = domain
  }
  return HTTPClient({
    method: 'get',
    baseURL,
    url: `/tasks/poll/batch/${taskType}`,
    params
  })
}

export function ackTask(baseURL: string, taskType: string, workerId: string) {
  return HTTPClient({
    method: 'post',
    baseURL,
    url: `/tasks/${taskType}/ack`,
    params: {
      workerid: workerId
    }
  })
}

export function getAllTasksInQueue(baseURL: string) {
  return HTTPClient({
    method: 'get',
    baseURL,
    url: '/tasks/queue/all'
  })
}

export function removeTaskFromQueue(baseURL: string, taskType: string, taskID: string) {
  return HTTPClient({
    method: 'delete',
    baseURL,
    url: `/tasks/queue/${taskType}/${taskID}`
  })
}

export function getTaskQueueSizes(baseURL: string, taskNames: string) {
  return HTTPClient({
    method: 'post',
    baseURL,
    url: '/tasks/queue/sizes',
    data: taskNames
  })
}

/** ********************/
/* Workflow Functions */
/** ********************/

export function getWorkflow(baseURL: string, workflowId: string, includeTasks: boolean = false) {
  return HTTPClient.get<Workflow>(`/workflow/${workflowId}`, {
    baseURL,
    params: {
      includeTasks: includeTasks ? 'boolean' : 'false'
    }
  })
}

export function getRunningWorkflows(baseURL: string, workflowName: string, version: number = 1) {
  return HTTPClient({
    method: 'get',
    baseURL,
    url: `/workflow/running/${workflowName}`,
    params: {
      version
    }
  })
}

export function searchWorkflows(
  baseURL: string,
  start: number = 0,
  size: number = 20,
  sort: string = 'ASC:createTime',
  freeText: string,
  query: any
) {
  return HTTPClient({
    method: 'get',
    baseURL,
    url: '/workflow/search',
    params: {
      start,
      size,
      sort,
      freeText,
      query
    }
  })
}

/**
 * start a workflow
 * @param baseURL 
 * @param workflowName 
 * @param version 
 * @param correlationId 
 * @param inputJson 
 * @returns workflowInstanceId
 */
export function startWorkflow(
  baseURL: string,
  workflowName: string,
  version: number = 1,
  correlationId: string,
  inputJson: any = {}
) {
  return HTTPClient({
    method: 'post',
    baseURL,
    url: `/workflow/${workflowName}`,
    params: {
      version,
      correlationId
    },
    data: inputJson
  })
}

export function terminateWorkflow(baseURL: string, workflowId: string, reason: string) {
  return HTTPClient({
    method: 'delete',
    baseURL,
    url: `/workflow/${workflowId}`,
    params: {
      reason
    }
  })
}

export function deleteWorkflowFromSystem(baseURL: string, workflowId: string, reason: string) {
  return HTTPClient({
    method: 'delete',
    baseURL,
    url: `/workflow/${workflowId}/remove`,
    params: {
      reason
    }
  })
}

export function pauseWorkflow(baseURL: string, workflowId: string) {
  return HTTPClient({
    method: 'put',
    baseURL,
    url: `/workflow/${workflowId}/pause`
  })
}

export function resumeWorkflow(baseURL: string, workflowId: string) {
  return HTTPClient({
    method: 'put',
    baseURL,
    url: `/workflow/${workflowId}/resume`
  })
}

export function skipTaskFromWorkflow(
  baseURL: string,
  workflowId: string,
  taskReferenceName: string,
  taskInput: any = {},
  taskOutput: any = {}
) {
  return HTTPClient({
    method: 'put',
    baseURL,
    url: `/workflow/${workflowId}/skiptask/${taskReferenceName}`,
    data: { taskInput, taskOutput }
  })
}

type RerunWorkflowRequest = {
  reRunFromWorkflowId: string
  workflowInput: any
  reRunFromTaskId: string
  taskInput: any
}

export function rerunWorkflow(
  baseURL: string,
  workflowId,
  rerunWorkflowRequest: RerunWorkflowRequest
) {
  return HTTPClient({
    method: 'post',
    baseURL,
    url: `/workflow/${workflowId}/rerun`,
    data: rerunWorkflowRequest
  })
}

export function retryWorkflow(baseURL: string, workflowId: string) {
  return HTTPClient({
    method: 'post',
    baseURL,
    url: `/workflow/${workflowId}/retry`
  })
}

export function restartWorkflow(baseURL: string, workflowId: string) {
  return HTTPClient({
    method: 'post',
    baseURL,
    url: `/workflow/${workflowId}/restart`
  })
}


export function getCorrelatedWorkflows(baseURL: string, name: string, correlationId: string, includeClosed?: boolean, includeTasks?: boolean) {
  return HTTPClient.get<Workflow[]>(`/workflow/${name}/correlated/${correlationId}`, {
    baseURL,
    params: {
      includeTasks: includeTasks ? 'boolean' : 'false',
      includeClosed: includeClosed ? 'boolean' : 'false',
    }
  })
}

