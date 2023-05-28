using AutoMapper;
using taxe_studentesti_be.student_taxes_api.application;
using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;
using taxe_studentesti_be.Student_Taxes_Impl.Infrastructure;
using taxe_studentesti_be.student_taxes_impl.model;

namespace taxe_studentesti_be.Student_Taxes_Impl.Application
{
    public class HostelFeeService : IHostelFeeServiceApi
    {
        private readonly HostelFeeRepository _hostelFeeRepository;
        private readonly IMapper _mapper;

        public HostelFeeService(HostelFeeRepository hostelFeeRepository, IMapper mapper)
        {
            _hostelFeeRepository = hostelFeeRepository;
            _mapper = mapper;
        }

        public void CreateHostelFee(HostelFeeRequestDto request)
        {
            HostelFeeEntity hostelFeeEntity = _mapper.Map<HostelFeeEntity>(request);
            _hostelFeeRepository.Save(hostelFeeEntity);
        }

        public void UpdateHostelFee(long id, HostelFeeRequestDto request)
        {
            HostelFeeEntity hostelFeeEntity = _hostelFeeRepository.FindById(id) ?? throw new ArgumentNullException();
            _mapper.Map(request, hostelFeeEntity);
            _hostelFeeRepository.Save(hostelFeeEntity);
        }

        public void DeleteHostelFee(long id)
        {
            _hostelFeeRepository.DeleteById(id);
        }

        public List<HostelFeeResponseDto> GetHostelFees()
        {
            List<HostelFeeEntity> hostelFeeEntities = _hostelFeeRepository.FindAll();
            return hostelFeeEntities.Select(ConvertToDto).ToList();
        }

        private HostelFeeResponseDto ConvertToDto(HostelFeeEntity request)
        {
            return _mapper.Map<HostelFeeResponseDto>(request);
        }
    }
}
