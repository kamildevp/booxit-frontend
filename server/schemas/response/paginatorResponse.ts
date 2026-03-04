import type { ZodObject, ZodRawShape } from 'zod'
import paginator from '../paginator'
import successResponse from './successResponse'

export default <T extends ZodRawShape>(dataSchema: ZodObject<T>) => successResponse(paginator(dataSchema))
