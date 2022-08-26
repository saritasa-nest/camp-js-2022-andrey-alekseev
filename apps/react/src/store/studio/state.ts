import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { Studio } from '@js-camp/core/models/studio';

export const studioAdapter = createEntityAdapter<Studio>({
  selectId: studio => studio.id,
});

/** Anime Genre state. */
export interface StudioState extends EntityState<Studio> {

  /** Is genres loading. */
  readonly isLoading: boolean;
}

export const initialState: StudioState = studioAdapter.getInitialState({
  isLoading: false,
});
