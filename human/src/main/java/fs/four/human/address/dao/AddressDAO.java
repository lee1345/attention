package fs.four.human.address.dao;

import fs.four.human.address.vo.AddressVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AddressDAO {

    // 전체 주소록 데이터 조회
    List<AddressVO> getAllAddress();

    // 필터와 검색어 기반 검색
    List<AddressVO> searchAddress(
            @Param("category") String category, @Param("query") String query);

//    // 새로운 주소 데이터 등록
//    void createAddress(AddressVO address);
//
//    // 주소 데이터 수정
//    void updateAddress(AddressVO address);
//
//    // 주소 데이터 삭제
//    void deleteAddress(String id);

}
