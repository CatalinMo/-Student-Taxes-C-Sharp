using AutoMapper;
using taxe_studentesti_be.student_taxes_api.application;
using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;
using taxe_studentesti_be.Student_Taxes_Impl.Infrastructure;
using taxe_studentesti_be.student_taxes_impl.model;

namespace taxe_studentesti_be.Student_Taxes_Impl.Application
{
    public class OtherFeeService : IOtherFeeServiceApi
    {
        private readonly OtherFeeRepository _otherFeeRepository;
        private readonly IMapper _mapper;

        public OtherFeeService(OtherFeeRepository otherFeeRepository, IMapper mapper)
        {
            _otherFeeRepository = otherFeeRepository;
            _mapper = mapper;
        }

        public void CreateOtherFee(OtherFeeRequestDto request)
        {
            OtherFeeEntity otherFeeEntity = _mapper.Map<OtherFeeEntity>(request);
            _otherFeeRepository.Save(otherFeeEntity);
        }

        public void UpdateOtherFee(long id, OtherFeeRequestDto request)
        {
            OtherFeeEntity otherFeeEntity = _otherFeeRepository.FindById(id) ?? throw new ArgumentNullException();
            _mapper.Map(request, otherFeeEntity);
            _otherFeeRepository.Save(otherFeeEntity);
        }

        public void DeleteOtherFee(long id)
        {
            _otherFeeRepository.DeleteById(id);
        }

        public List<OtherFeeResponseDto> GetOtherFees()
        {
            List<OtherFeeEntity> otherFeeEntities = _otherFeeRepository.FindAll();
            return otherFeeEntities.Select(ConvertToDto).ToList();
        }

        private OtherFeeResponseDto ConvertToDto(OtherFeeEntity request)
        {
            return _mapper.Map<OtherFeeResponseDto>(request);
        }
    }
}
