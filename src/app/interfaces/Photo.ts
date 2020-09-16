export interface Photo {
	_id?: string;
	title: string;
	description: string;
	imagePath: string; 
}

export interface PhotoStoreRequest {
	message: string;
	photo: Photo;
}