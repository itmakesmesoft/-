package com.ssafy.moida.repository.user;

import com.ssafy.moida.api.response.GetUserDonationResDto;
import com.ssafy.moida.model.user.UsersDonation;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.OptionalLong;

public interface UsersDonationRepository extends JpaRepository<UsersDonation, Long>,
    PagingAndSortingRepository<UsersDonation, Long> {
    @Query("SELECT new com.ssafy.moida.api.response.GetUserDonationResDto("
            + "ud.project.id, "
            + "ud.project.subject, "
            + "ud.project.generation, "
            + "ud.regDate, "
            + "CAST(ud.amount / ud.project.pointPerMoi AS LONG), "
            + "ud.ticketCnt) "
            + "FROM UsersDonation ud "
            + "WHERE ud.users.id = :userId ")
    List<GetUserDonationResDto> findDonationsByUserId(@Param("userId") Long userId, Pageable pageable);

    Optional<List<UsersDonation>> findByUsersId(Long userId);

    @Query("select sum(ud.amount) from UsersDonation ud where ud.users.id = :userId")
    Long findTotalPoint(@Param("userId") Long userId);

    boolean existsByUsersId(Long userId);

    @Query("select sum(ud.moi) from UsersDonation ud where ud.users.id = :userId and ud.project.category like :category")
    int findMoi(@Param("userId") Long userId, @Param("category") String category);

    @Query("select count(ud.id) > 0 from UsersDonation ud where ud.users.id = :userId and ud.project.category like :category")
    boolean existsByuserIdAndProjectCategory(@Param("userId") Long userId, @Param("category") String category);
}
