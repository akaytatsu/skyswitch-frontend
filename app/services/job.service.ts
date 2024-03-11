import { api } from '~/common/api';
import { JobModel } from '~/models/job.model';

export class JobService {
  async list(request: Request): Promise<JobModel[]> {
    const response = await api.get(`job/`, {
      request,
    });

    return response.map((data: any) => new JobModel(data));
  }
}
