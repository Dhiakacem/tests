<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use stdClass;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AuthentificationController extends AbstractController
{

    private $entityManager;
    private $userRepository;
    private $jwtTokenManager;
    private $passwordEncoder;

    public function __construct(JWTTokenManagerInterface  $JWTTokenManager , EntityManagerInterface $entityManager, 
        UserRepository $userRepository , UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->jwtTokenManager = $JWTTokenManager ;
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * @Route("/login", name="login", methods={"POST"}))
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function login(Request $request ): JsonResponse
    {
    
        $email = $request->get('email');
        $password = $request->get('password');

        if ($email == '' || $email == null || $password == '' || $password == null) {
            return new JsonResponse('BAD REQUEST', Response::HTTP_BAD_REQUEST);
        }


        try {

              $user_exist = $this->userRepository->findOneBy(['email' =>$email]);

              if (!$user_exist ) {
            return new JsonResponse("USER DOESNT EXIST", Response::HTTP_UNAUTHORIZED);
            
        } 
        
        // Verify the password
        $user = new User();
        $user->setPassword($user_exist->getPassword());
        if (!$this->passwordEncoder->isPasswordValid($user, $password)) {
            return new JsonResponse('incorrect Email and/or Password.', Response::HTTP_UNAUTHORIZED); 
        }             

        $hub_user = new stdClass();
        $hub_user->id = $user_exist->getId();
        $hub_user->email = $user_exist->getEmail();
        $hub_user->name = $user_exist->getName();
        $hub_user->lastname = $user_exist->getLastName();
        $hub_user->phonenumber = $user_exist->getPhoneNumber();



        //$hub_user->token = $token;
        $token = $this->jwtTokenManager->create($user_exist);
        $hub_user->token = $token;

        return new JsonResponse($hub_user,Response::HTTP_OK);
    

        } catch (\Exception $e) {
            $userApi = new JsonResponse (
                'Nom utilisateur et/ou mot de passe incorrects.',
                Response::HTTP_UNAUTHORIZED
            );
            return $userApi;
        }

    }

    /**
     * @Route("/signup", name="signup", methods={"POST"}))
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function signup(Request $request): JsonResponse
    {
    
        $email = $request->get('email');
        $password = $request->get('password');
        $username = $request->get('username');
        $name = $request->get('name');
        $lastname = $request->get('lastName');
        $gender = $request->get('gender');
        $phoneNumber = $request->get('phoneNumber');


        $user_exist = $this->userRepository->findOneBy(['email' =>$email]);

        if ($user_exist ) {
      return new JsonResponse(Response::HTTP_UNAUTHORIZED, "email already EXIST");
      
  } 

  $user_exist = $this->userRepository->findOneBy(['username' =>$username]);

  if ($user_exist ) {
    return new JsonResponse(Response::HTTP_UNAUTHORIZED, "username already EXIST");

} 

         // Create a new user entity
        $user = new User();
        $user->setEmail($email);
        $user->setUsername($username);
        $user->setName($name);
        $user->setLastName($lastname);
        $user->setGender($gender);
        $user->setPhoneNumber($phoneNumber);
        $user->setRoles(["ROLE_USER"]);

    // Encode the password
       $encodedPassword = $this->passwordEncoder->encodePassword($user, $password);
       $user->setPassword($encodedPassword);

    
      $this->entityManager->persist($user);
      $this->entityManager->flush();

    return new JsonResponse(['message' => 'User registered successfully'], JsonResponse::HTTP_OK);
}
        

}