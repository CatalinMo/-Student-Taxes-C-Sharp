using AutoMapper;
using taxe_studentesti_be.student_taxes_api.application;
using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;
using taxe_studentesti_be.Student_Taxes_Impl.Infrastructure;
using taxe_studentesti_be.student_taxes_impl.model;

namespace taxe_studentesti_be.Student_Taxes_Impl.Application
{
    public class StudyFeeService : IStudyFeeServiceApi
    {
        private readonly StudyFeeRepository _studyFeeRepository;
        private readonly IMapper _mapper;

        public StudyFeeService(StudyFeeRepository studyFeeRepository, IMapper mapper)
        {
            _studyFeeRepository = studyFeeRepository;
            _mapper = mapper;
        }

        public void UpdateStudy(long id, StudyFeeRequestDto request)
        {
            StudyFeeEntity studyFeeEntity = _studyFeeRepository.FindById(id) ?? throw new ArgumentNullException();
            _mapper.Map(request, studyFeeEntity);
            _studyFeeRepository.Save(studyFeeEntity);
        }

        public void DeleteStudyFee(long id)
        {
            _studyFeeRepository.DeleteById(id);
        }

        public List<StudyFeeResponseDto> GetStudyFees()
        {
            List<StudyFeeEntity> studyFees = _studyFeeRepository.FindAll();
            return ConvertToStudyFeeDto(studyFees);
        }

        private List<StudyFeeResponseDto> ConvertToStudyFeeDto(List<StudyFeeEntity> studyFees)
        {
            return studyFees.Select(Convert).ToList();
        }

        private StudyFeeResponseDto Convert(StudyFeeEntity studyFeeEntity)
        {
            return new StudyFeeResponseDto
            {
                Id = studyFeeEntity.Id,
                Name = studyFeeEntity.Name,
                Value = studyFeeEntity.Value,
                Type = studyFeeEntity.Type,
                Study = Convert(studyFeeEntity.Study)
            };
        }

        private StudyResponseDto Convert(StudyEntity studyEntity)
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
    }
}
