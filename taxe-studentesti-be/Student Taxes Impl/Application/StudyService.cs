using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;
using taxe_studentesti_be.Student_Taxes_Impl.Infrastructure;
using taxe_studentesti_be.student_taxes_impl.model;
using taxe_studentesti_be.student_taxes_api.application;
using AutoMapper;

namespace taxe_studentesti_be.Student_Taxes_Impl.Application
{
    public class StudyService : IStudyServiceApi
    {
        private readonly StudyRepository _studyRepository;
        private readonly ActiveStudyRepository _activeStudyRepository;
        private readonly IMapper _mapper;

        public StudyService(StudyRepository studyRepository, ActiveStudyRepository activeStudyRepository, IMapper mapper)
        {
            this._studyRepository = studyRepository;
            this._activeStudyRepository = activeStudyRepository;
            this._mapper = mapper;
        }

        public void CreateStudy(StudyRequestDto request)
        {
            StudyEntity studyEntity = ConvertToEntity(request);
            _studyRepository.Save(studyEntity);
        }

        public void UpdateStudy(long id, StudyRequestDto request)
        {
            StudyEntity studyEntity = _studyRepository.FindById(id) ?? throw new ArgumentNullException();
            MapToEntity(request, studyEntity);
            _studyRepository.Save(studyEntity);
        }

        public void DeleteStudy(long id)
        {
            _studyRepository.DeleteById(id);
        }

        public void DeleteActiveStudy(long id)
        {
            _activeStudyRepository.DeleteById(id);
        }

        public List<StudyResponseDto> GetStudies()
        {
            List<StudyEntity> studyEntities = _studyRepository.FindAll();
            return ConvertToDtoList(studyEntities);
        }

        private List<StudyResponseDto> ConvertToDtoList(List<StudyEntity> studyEntities)
        {
            return studyEntities.Select(ConvertToDto).ToList();
        }

        private StudyResponseDto ConvertToDto(StudyEntity studyEntity)
        {
            return new StudyResponseDto
            {
                Id = studyEntity.Id,
                Faculty = studyEntity.Faculty,
                Cycle = studyEntity.Cycle,
                Department = studyEntity.Department,
                StudyProgram = studyEntity.StudyProgram,
                Form = studyEntity.Form,
                StudyFees = studyEntity.StudyFees?.Select(ConvertToDto).ToList(),
                Year = studyEntity.Year,
                Abbreviation = studyEntity.Abbreviation
            };
        }

        private StudyFeeResponseDto ConvertToDto(StudyFeeEntity request)
        {
            return _mapper.Map<StudyFeeResponseDto>(request);
        }

        private StudyEntity ConvertToEntity(StudyRequestDto request)
        {
            return _mapper.Map<StudyEntity>(request);
        }

        private void MapToEntity(StudyRequestDto request, StudyEntity studyEntity)
        {
            _mapper.Map(request, studyEntity);
        }
    }
}
