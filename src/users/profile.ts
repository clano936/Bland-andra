export interface UserProfile {
  saved: string[];
}

const profileKey = 'userProfile';

export function getProfile(): UserProfile {

    //försöker hämta en sparad profil 
  const savedProfile = localStorage.getItem(profileKey);

//hämtas ifall profilen finns
  if (savedProfile) {
    return JSON.parse(savedProfile) as UserProfile;
  }

  // annars skapa en ny
  const newProfile: UserProfile = {
    saved: [],
  };
 
  //sparar den nya profilen i localStorage som json-sträng
  localStorage.setItem(profileKey, JSON.stringify(newProfile));

  //retunerar den skapade profilen
  return newProfile;
}