import { SandboxedRoute } from '../../components/SandboxedRoute';
import List from './list';
import Single from './single';

export default (
   <cx>
      <SandboxedRoute route="~/customers">{List}</SandboxedRoute>
      <SandboxedRoute route="~/customers/:id">{Single}</SandboxedRoute>
   </cx>
);
