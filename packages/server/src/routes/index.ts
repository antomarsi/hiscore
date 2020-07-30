import { ScoreController } from '../controller/ScoreController';
import { AuthController } from '../controller/AuthController';
import { GameController } from '../controller/GameController';

/**
 * All application routes.
 */
export const AppRoutesV1 = [AuthController, GameController, ScoreController];
