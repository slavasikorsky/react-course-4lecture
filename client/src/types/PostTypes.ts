import { ObjectId } from "mongoose";

export interface PostTypes {
	_id: ObjectId;
	title: string;
	clName?: string;
	thumbnail?: string;
	body: string;
	categories: string;
	tag: string;
	likes: number;
}
