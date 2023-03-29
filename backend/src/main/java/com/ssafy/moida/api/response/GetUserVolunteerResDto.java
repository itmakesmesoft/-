package com.ssafy.moida.api.response;

import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.project.Status;
import com.ssafy.moida.model.user.UsersVolunteer;
import lombok.*;

import java.time.LocalDateTime;

/**
 * [한선영] 봉사 내역 dto
 * 봉사Id, 프로젝트Id, 프로젝트명, 기수, 봉사일시, 상태
 * */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetUserVolunteerResDto {
    private Long volunteerId;
    private Long articleId;
    private Long projectId;
    private String projectSubject;
    private int generation;
    private LocalDateTime regDate;
    private Status status;

    public GetUserVolunteerResDto(UsersVolunteer v, Long articleId) {
        Project p = v.getVolunteerDateInfo().getProject();
        this.volunteerId = v.getId();
        this.articleId = articleId;
        this.projectId = p.getId();
        this.projectSubject = p.getSubject();
        this.generation = p.getGeneration();
        this.regDate = v.getRegDate();
        this.status = v.getStatus();
    }
}
