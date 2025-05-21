import { Router } from 'express';
import building from './routes/buildingRoute';
import floor from './routes/floorRoute';
import room from './routes/roomRoute';
import buildingConnection from './routes/buildingConnectionRoute';
import robotType from './routes/robotTypeRoute';
import elevator from './routes/elevatorRoute';
import robot from './routes/robotRoute';
import task from './routes/taskRoute';

export default () => {
	const app = Router();

	task(app)
	robot(app);
	elevator(app);
	robotType(app);
	buildingConnection(app);
	room(app);
	floor(app);
	building(app);
	
	return app
}