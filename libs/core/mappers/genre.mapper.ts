import { GenreType } from '../models/genre/genreType';
import { GenreDto } from '../dtos/genre.dto';
import { Genre } from '../models/genre/genre';

export namespace GenreMapper {

  /**
   * Maps dto to model.
   * @param dto Genre dto.
   */
  export function fromDto(dto: GenreDto): Genre {
    return new Genre({
      id: dto.id,
      name: dto.name,
      type: GenreType.toGenreType(dto.type),
    });
  }
}
