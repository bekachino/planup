import { createSlice } from '@reduxjs/toolkit';
import {
  createResolution,
  createSectionChief,
  createServiceEngineer,
  createSquare,
  createTemplate,
  createUser,
  deleteResolution,
  deleteSectionChief,
  deleteServiceEngineer,
  deleteSquare,
  deleteTemplate,
  deleteUser,
  editResolution,
  editSquare,
  editTemplate,
  editUser,
  getLocations,
  getResolution,
  getSectionChief,
  getSectionChiefs,
  getServiceEngineer,
  getServiceEngineers,
  getSquare,
  getTemplate,
  getUser,
  getUsers,
  updatePassword,
} from './dataThunk';

const initialState = {
  alerts: [],
  searchValue: '',
  locations: [],
  serviceEngineers: [],
  sectionChiefs: [],
  users: [],
  user: null,
  sectionChief: null,
  serviceEngineer: null,
  template: null,
  resolution: null,
  square: null,
  usersLoading: false,
  userLoading: false,
  sectionChiefLoading: false,
  serviceEngineerLoading: false,
  locationsLoading: false,
  serviceEngineersLoading: false,
  sectionChiefsLoading: false,
  getTemplateLoading: false,
  getResolutionLoading: false,
  getSquareLoading: false,
  createTemplateLoading: false,
  createResolutionLoading: false,
  createSquareLoading: false,
  createUserLoading: false,
  createSectionChiefLoading: false,
  createServiceEngineerLoading: false,
  editTemplateLoading: false,
  editResolutionLoading: false,
  editUserLoading: false,
  editSquareLoading: false,
  deleteTemplateLoading: false,
  deleteResolutionLoading: false,
  deleteSquareLoading: false,
  updatePasswordLoading: false,
  deleteUserLoading: false,
  deleteSectionChiefLoading: false,
  deleteServiceEngineerLoading: false,
};

const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addAlert: (state, { payload }) => {
      const randomNumber1 = Math.random() * (20000 - 1000 + 1) + 1000;
      const randomNumber2 = Math.random() * (20000 - 1000 + 1) + 1000;
      const randomNumber3 = Math.random() * (20000 - 1000 + 1) + 1000;

      state.alerts.push({
        ...payload,
        id: `${randomNumber1 * randomNumber2 + randomNumber3}`,
        show: true,
      });
    },
    removeAlert: (state, { payload }) => {
      if (!!state.alerts.find((alert) => alert.id === payload)?.show)
        state.alerts.find((alert) => alert.id === payload).show = false;
    },
    resetAlerts: (state) => {
      state.alerts = [];
    },
    clearResolution: (state) => {
      state.resolution = null;
    },
    handleSearchValueChange: (state, { payload }) => {
      state.searchValue = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTemplate.pending, (state) => {
      state.getTemplateLoading = true;
      state.template = null;
    });
    builder.addCase(getTemplate.fulfilled, (state, { payload: res }) => {
      state.getTemplateLoading = false;
      state.template = res || null;
    });
    builder.addCase(getTemplate.rejected, (state) => {
      state.getTemplateLoading = false;
    });

    builder.addCase(getResolution.pending, (state) => {
      state.getResolutionLoading = true;
      state.resolution = null;
    });
    builder.addCase(getResolution.fulfilled, (state, { payload: res }) => {
      state.getResolutionLoading = false;
      state.resolution = res || null;
    });
    builder.addCase(getResolution.rejected, (state) => {
      state.getResolutionLoading = false;
    });

    builder.addCase(getSquare.pending, (state) => {
      state.getSquareLoading = true;
      state.square = null;
    });
    builder.addCase(getSquare.fulfilled, (state, { payload: res }) => {
      state.getSquareLoading = false;
      state.square = res || null;
    });
    builder.addCase(getSquare.rejected, (state) => {
      state.getSquareLoading = false;
    });

    builder.addCase(createTemplate.pending, (state) => {
      state.createTemplateLoading = true;
    });
    builder.addCase(createTemplate.fulfilled, (state) => {
      state.createTemplateLoading = false;
    });
    builder.addCase(createTemplate.rejected, (state) => {
      state.createTemplateLoading = false;
    });

    builder.addCase(editTemplate.pending, (state) => {
      state.editTemplateLoading = true;
    });
    builder.addCase(editTemplate.fulfilled, (state) => {
      state.editTemplateLoading = false;
    });
    builder.addCase(editTemplate.rejected, (state) => {
      state.editTemplateLoading = false;
    });

    builder.addCase(deleteTemplate.pending, (state) => {
      state.deleteTemplateLoading = true;
    });
    builder.addCase(deleteTemplate.fulfilled, (state) => {
      state.deleteTemplateLoading = false;
    });
    builder.addCase(deleteTemplate.rejected, (state) => {
      state.deleteTemplateLoading = false;
    });

    builder.addCase(deleteResolution.pending, (state) => {
      state.deleteResolutionLoading = true;
    });
    builder.addCase(deleteResolution.fulfilled, (state) => {
      state.deleteResolutionLoading = false;
    });
    builder.addCase(deleteResolution.rejected, (state) => {
      state.deleteResolutionLoading = false;
    });

    builder.addCase(deleteSquare.pending, (state) => {
      state.deleteSquareLoading = true;
    });
    builder.addCase(deleteSquare.fulfilled, (state) => {
      state.deleteSquareLoading = false;
    });
    builder.addCase(deleteSquare.rejected, (state) => {
      state.deleteSquareLoading = false;
    });

    builder.addCase(createResolution.pending, (state) => {
      state.createResolutionLoading = true;
    });
    builder.addCase(createResolution.fulfilled, (state) => {
      state.createResolutionLoading = false;
    });
    builder.addCase(createResolution.rejected, (state) => {
      state.createResolutionLoading = false;
    });

    builder.addCase(editResolution.pending, (state) => {
      state.editResolutionLoading = true;
    });
    builder.addCase(editResolution.fulfilled, (state) => {
      state.editResolutionLoading = false;
    });
    builder.addCase(editResolution.rejected, (state) => {
      state.editResolutionLoading = false;
    });

    builder.addCase(getLocations.pending, (state) => {
      state.locationsLoading = true;
      state.locations = [];
    });
    builder.addCase(getLocations.fulfilled, (state, { payload: res }) => {
      state.locationsLoading = false;
      state.locations = res || [];
    });
    builder.addCase(getLocations.rejected, (state) => {
      state.locationsLoading = false;
    });

    builder.addCase(getServiceEngineers.pending, (state) => {
      state.serviceEngineersLoading = true;
      state.serviceEngineers = [];
    });
    builder.addCase(
      getServiceEngineers.fulfilled,
      (state, { payload: res }) => {
        state.serviceEngineersLoading = false;
        state.serviceEngineers = res || [];
      }
    );
    builder.addCase(getServiceEngineers.rejected, (state) => {
      state.serviceEngineersLoading = false;
    });

    builder.addCase(getServiceEngineer.pending, (state) => {
      state.serviceEngineerLoading = true;
      state.sectionChief = null;
    });
    builder.addCase(getServiceEngineer.fulfilled, (state, { payload: res }) => {
      state.serviceEngineerLoading = false;
      state.serviceEngineer = {
        ...res?.service_engineer,
        id: res?.id,
      };
    });
    builder.addCase(getServiceEngineer.rejected, (state) => {
      state.serviceEngineerLoading = false;
    });

    builder.addCase(deleteServiceEngineer.pending, (state) => {
      state.deleteServiceEngineerLoading = true;
    });
    builder.addCase(deleteServiceEngineer.fulfilled, (state) => {
      state.deleteServiceEngineerLoading = false;
    });
    builder.addCase(deleteServiceEngineer.rejected, (state) => {
      state.deleteServiceEngineerLoading = false;
    });

    builder.addCase(getSectionChiefs.pending, (state) => {
      state.sectionChiefsLoading = true;
      state.sectionChiefs = [];
    });
    builder.addCase(getSectionChiefs.fulfilled, (state, { payload: res }) => {
      state.sectionChiefsLoading = false;
      state.sectionChiefs = res || [];
    });
    builder.addCase(getSectionChiefs.rejected, (state) => {
      state.sectionChiefsLoading = false;
    });

    builder.addCase(getSectionChief.pending, (state) => {
      state.sectionChiefLoading = true;
      state.sectionChief = null;
    });
    builder.addCase(getSectionChief.fulfilled, (state, { payload: res }) => {
      state.sectionChiefLoading = false;
      state.sectionChief = {
        ...res?.section_chief,
        id: res?.id,
      };
    });
    builder.addCase(getSectionChief.rejected, (state) => {
      state.sectionChiefLoading = false;
    });

    builder.addCase(deleteSectionChief.pending, (state) => {
      state.deleteSectionChiefLoading = true;
    });
    builder.addCase(deleteSectionChief.fulfilled, (state) => {
      state.deleteSectionChiefLoading = false;
    });
    builder.addCase(deleteSectionChief.rejected, (state) => {
      state.deleteSectionChiefLoading = false;
    });

    builder.addCase(createSquare.pending, (state) => {
      state.createSquareLoading = true;
    });
    builder.addCase(createSquare.fulfilled, (state) => {
      state.createSquareLoading = false;
    });
    builder.addCase(createSquare.rejected, (state) => {
      state.createSquareLoading = false;
    });

    builder.addCase(editSquare.pending, (state) => {
      state.editSquareLoading = true;
    });
    builder.addCase(editSquare.fulfilled, (state) => {
      state.editSquareLoading = false;
    });
    builder.addCase(editSquare.rejected, (state) => {
      state.editSquareLoading = false;
    });

    builder.addCase(createUser.pending, (state) => {
      state.createUserLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.createUserLoading = false;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.createUserLoading = false;
    });

    builder.addCase(editUser.pending, (state) => {
      state.editUserLoading = true;
    });
    builder.addCase(editUser.fulfilled, (state) => {
      state.editUserLoading = false;
    });
    builder.addCase(editUser.rejected, (state) => {
      state.editUserLoading = false;
    });

    builder.addCase(getUsers.pending, (state) => {
      state.usersLoading = true;
      state.users = [];
    });
    builder.addCase(getUsers.fulfilled, (state, { payload: res }) => {
      state.usersLoading = false;
      state.users = res || [];
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.usersLoading = false;
    });

    builder.addCase(getUser.pending, (state) => {
      state.userLoading = true;
      state.user = null;
    });
    builder.addCase(getUser.fulfilled, (state, { payload: res }) => {
      state.userLoading = false;
      state.user = res || null;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.userLoading = false;
    });

    builder.addCase(createSectionChief.pending, (state) => {
      state.creatSectionChiefrLoading = true;
    });
    builder.addCase(createSectionChief.fulfilled, (state) => {
      state.createSectionChiefLoading = false;
    });
    builder.addCase(createSectionChief.rejected, (state) => {
      state.createSectionChiefLoading = false;
    });

    builder.addCase(createServiceEngineer.pending, (state) => {
      state.createServiceEngineerLoading = true;
    });
    builder.addCase(createServiceEngineer.fulfilled, (state) => {
      state.createServiceEngineerLoading = false;
    });
    builder.addCase(createServiceEngineer.rejected, (state) => {
      state.createServiceEngineerLoading = false;
    });

    builder.addCase(updatePassword.pending, (state) => {
      state.updatePasswordLoading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      state.updatePasswordLoading = false;
    });
    builder.addCase(updatePassword.rejected, (state) => {
      state.updatePasswordLoading = false;
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.deleteUserLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.deleteUserLoading = false;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.deleteUserLoading = false;
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const {
  addAlert,
  removeAlert,
  clearResolution,
  handleSearchValueChange,
  resetAlerts,
} = DataSlice.actions;
