import axios from 'axios';
import { dispatch, getState } from '../reducers/store';
import { get } from 'lodash';
import { errorMessageHandler, userDataFormatter } from '../helper';

import {
  setCities,
  setCountries,
  setStates,
} from '../reducers/slices/MasterSlice';
import { setBtnLoader, setShowLoader } from '../reducers/slices/ThemeSlice';
import { setFilesData } from '../reducers/slices/FilesDataSlice';
import { setUserData } from '../reducers/slices/UserSlice';

const dropDownFormatter = responseData => {
  if (responseData) {
    return responseData.map(item => ({
      label: item.name,
      value: item.id,
    }));
  }
};

export const getCountriesData = async () => {
  const countries = getState().MasterData.countries;
  if (!countries.length) {
    try {
      dispatch(setShowLoader(true));
      const response = await axios.get('api/data/get-countries');
      if (get(response, 'status', false) && response?.data?.length) {
        dispatch(setCountries(dropDownFormatter(response.data)));
      } else {
        errorMessageHandler(response.data);
      }
    } catch (error) {
      console.log('Getting Counteries Error', error);
    } finally {
      dispatch(setShowLoader(false));
    }
  }
};

export const getStatesData = async () => {
  const states = getState().MasterData.states;
  if (!states.length) {
    try {
      dispatch(setShowLoader(true));
      const response = await axios.get('api/data/get-states');
      if (get(response, 'status', false) && response?.data?.length) {
        dispatch(setStates(dropDownFormatter(response.data)));
      } else {
        errorMessageHandler(response.data);
      }
    } catch (error) {
      console.log('Getting States Error', error);
    } finally {
      dispatch(setShowLoader(false));
    }
  }
};

export const getCitiesByStateId = async id => {
  if (id) {
    try {
      dispatch(setShowLoader(true));
      const response = await axios.get(`api/data/get-cities/${id}`);
      if (get(response, 'status', false)) {
        dispatch(setCities(dropDownFormatter(response.data)));
      } else {
        errorMessageHandler(response.data);
      }
    } catch (error) {
      console.log('Getting Cities Error', error);
    } finally {
      dispatch(setShowLoader(false));
    }
  }
};

const albumFormatter = (albums, files) => {
  if (files) {
    return {
      ...albums,
      data: [
        ...files,
        ...albums?.data.map(album => ({
          id: album.id ? album.id : null,
          originalName: album?.name ?? '',
          fullPath: album?.documents[0]?.full_path ?? '',
          createdAt: album?.created_at ?? '',
          updatedAt: album?.updated_at ?? '',
        })),
      ],
    };
  }
  return {
    ...albums,
    data: albums?.data.map(album => ({
      id: album.id ? album.id : null,
      originalName: album?.name ?? '',
      fullPath: album?.documents[0]?.full_path ?? '',
      createdAt: album?.created_at ?? '',
      updatedAt: album?.updated_at ?? '',
    })),
  };
};

export const getAlbumsListing = async (params, files) => {
  const payload = {
    page: params?.page ?? 1,
    page_size: 15,
  };
  try {
    dispatch(setBtnLoader(true));
    const response = await axios.post('/api/album/listing', payload);
    if (get(response, 'status', false)) {
      dispatch(setFilesData(albumFormatter(response, files)));
    } else {
      errorMessageHandler(response);
    }
  } catch (error) {
    console.log('Getting Devices Error', error);
  } finally {
    dispatch(setBtnLoader(false));
  }
};

export const getAlbumById = async id => {
  try {
    dispatch(setShowLoader(true));
    const response = await axios.get(`/api/album/${id}`);
    if (get(response, 'status', false)) {
      return response.data;
    } else {
      errorMessageHandler(response.data);
    }
  } catch (error) {
    console.log('Getting Devices Error', error);
  } finally {
    dispatch(setShowLoader(false));
  }
};

export const getUserByToken = async () => {
  try {
    dispatch(setShowLoader(true));
    const response = await axios.get('/api/users/me');
    if (get(response, 'status', false)) {
      dispatch(setUserData(userDataFormatter(response.data)));
    } else {
      errorMessageHandler(response);
    }
  } catch (error) {
    console.log('Getting User Error', error);
  } finally {
    dispatch(setShowLoader(false));
  }
};
