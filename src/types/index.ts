export type TfriendRequest = {
    _id: string;
    sender: {
      _id: string;
      name: string;
      img: string;
      email: string;
      password: string;
      phone: string;
      role: string;
      coverImg: string;
      bio: string;
      profession: string | null;
      educationInstitute: string;
      address: string;
      socialLinks: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
      verifyed: boolean;
      isBlocked: boolean;
    };
    receiver: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
